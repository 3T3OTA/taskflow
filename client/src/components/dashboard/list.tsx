import React from 'react';
import { Card, Button } from "@heroui/react";
import { Trash, EllipsisVertical, Plus, Menu } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { listsOrderUpdate, addListsToBoard, deleteListfromBoard, updateListInBoard } from '../../services/api';

interface Task {
  id: string;
  title: string;
}

interface ListType {
  id: string;
  title: string;
  tasks: Task[];
}

function Board(props: { boardData: any; onListsReorder?: (newOrder: any[]) => void }) {
  const [lists, setLists] = React.useState<ListType[]>(
    (props.boardData.lists || []).map((l: any) => ({ ...l, tasks: l.tasks || [] }))
  );
  const prevListsRef = React.useRef(props.boardData.lists);
  const [showAddListInput, setShowAddListInput] = React.useState(false);
  const [newListTitle, setNewListTitle] = React.useState("");
  const [editingListId, setEditingListId] = React.useState<string | null>(null);
  const [editingTitle, setEditingTitle] = React.useState("");

  React.useEffect(() => {
    if (prevListsRef.current !== props.boardData.lists) {
      setLists((props.boardData.lists || []).map((l: any) => ({ ...l, tasks: l.tasks || [] })));
      prevListsRef.current = props.boardData.lists;
    }
  }, [props.boardData.lists]);

  const addTask = (listId: string) => {
    setLists(lists =>
      lists.map(list =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                { id: Date.now().toString(), title: 'New Task' },
              ],
            }
          : list
      )
    );
  };

  const addList = async () => {
    if (!newListTitle.trim()) return;
    const title = newListTitle.trim();
    setNewListTitle("");
    setShowAddListInput(false);

    const tempId = Date.now().toString();
    setLists(lists => [
      ...lists,
      { id: tempId, title, tasks: [] }
    ]);

    try {
      const res = await addListsToBoard(props.boardData.id, title);
      if (res && res._id) {
        setLists(lists => lists.map(l => l.id === tempId ? { ...l, id: res._id, ...res, tasks: [] } : l));
      }
    } catch (err) {
      setLists(lists => lists.filter(l => l.id !== tempId));
      console.error('Failed to add list', err);
    }
  };

  const deleteList = async (listId: string) => {
    if (!confirm("Are you sure you want to delete this list?")) return;
    const originalLists = lists;
    setLists(lists => lists.filter(l => l.id !== listId));
    try {
      await deleteListfromBoard(props.boardData.id, listId);
    } catch (err) {
      setLists(originalLists);
      console.error('Failed to delete list', err);
    }
  };

  const startEditingList = (listId: string, currentTitle: string) => {
    setEditingListId(listId);
    setEditingTitle(currentTitle);
  };

  const saveListTitle = async (listId: string) => {
    const trimmed = editingTitle.trim();
    if (!trimmed) return;
    setLists(lists => lists.map(l => l.id === listId ? { ...l, title: trimmed } : l));
    setEditingListId(null);
    try {
      await updateListInBoard(props.boardData.id, listId, trimmed);
    } catch (err) {
      setLists(lists => lists.map(l => l.id === listId ? { ...l, title: lists.find(x => x.id === listId)?.title || "" } : l));
      console.error('Failed to update list title', err);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    if (result.type === 'LIST') {
      const reordered = Array.from(lists);
      const [removed] = reordered.splice(result.source.index, 1);
      reordered.splice(result.destination.index, 0, removed);
      setLists(reordered);
      if (props.onListsReorder) props.onListsReorder(reordered);
      try {
        const boardId = props.boardData.id;
        const newListIds = reordered.map(l => l.id);
        await listsOrderUpdate(boardId, newListIds);
      } catch (err) {
        console.error('Failed to update lists order', err);
      }
      return;
    }
    const sourceListIdx = lists.findIndex(l => l.id === result.source.droppableId);
    const destListIdx = lists.findIndex(l => l.id === result.destination!.droppableId);
    if (sourceListIdx === -1 || destListIdx === -1) return;

    if (sourceListIdx === destListIdx) {
      const newTasks = Array.from(lists[sourceListIdx].tasks);
      const [removedTask] = newTasks.splice(result.source.index, 1);
      newTasks.splice(result.destination.index, 0, removedTask);
      setLists(lists =>
        lists.map((list, idx) =>
          idx === sourceListIdx ? { ...list, tasks: newTasks } : list
        )
      );
    } else {
      const sourceTasks = Array.from(lists[sourceListIdx].tasks);
      const [removedTask] = sourceTasks.splice(result.source.index, 1);
      const destTasks = Array.from(lists[destListIdx].tasks);
      destTasks.splice(result.destination.index, 0, removedTask);
      setLists(lists =>
        lists.map((list, idx) => {
          if (idx === sourceListIdx) return { ...list, tasks: sourceTasks };
          if (idx === destListIdx) return { ...list, tasks: destTasks };
          return list;
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-lists" direction="horizontal" type="LIST">
        {(provided) => (
          <div
            className="flex flex-row gap-4 overflow-x-auto p-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {lists.map((list, idx) => (
              <Draggable draggableId={list.id.toString()} index={idx} key={list.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex flex-col"
                  >
                    <Card className="w-72 min-w-[280px] shadow-xl bg-default-100 flex-shrink-0">
                      <div className="p-3 flex justify-between items-center" {...provided.dragHandleProps}>
                        {editingListId === list.id ? (
                          <input
                            className="border rounded px-2 py-1 text-sm w-full mr-2"
                            value={editingTitle}
                            autoFocus
                            onChange={e => setEditingTitle(e.target.value)}
                            onBlur={() => saveListTitle(list.id)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                saveListTitle(list.id);
                              } else if (e.key === 'Escape') {
                                setEditingListId(null);
                              }
                            }}
                          />
                        ) : (
                          <h2
                            className="text-sm font-semibold cursor-pointer hover:underline"
                            onClick={() => startEditingList(list.id, list.title)}
                            title="Click to edit title"
                          >
                            {list.title}
                          </h2>
                        )}
                        <div className="flex items-center space-x-1">
                          <Button isIconOnly size="sm" variant="light" onPress={() => deleteList(list.id)}>
                            <Trash width={16} />
                          </Button>
                          <Button isIconOnly size="sm" variant="light">
                            <EllipsisVertical width={16} />
                          </Button>
                        </div>
                      </div>
                      <Droppable droppableId={list.id} type="TASK">
                        {(provided, snapshot) => (
                          <div
                            className={
                              "px-2 pb-2 pt-2 min-h-[120px] transition-colors " +
                              (snapshot.isDraggingOver ? "bg-default-200" : "")
                            }
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >

                            {list.tasks.map((task, tidx) => (
                              <Draggable draggableId={task.id} index={tidx} key={task.id}>
                                {(provided) => (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-2 p-2"
                                  >
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm">{task.title}</span>
                                      <Button isIconOnly size="sm" variant="light" >
                                        <Menu width={16} />
                                      </Button>
                                    </div>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                            <Button
                              size="sm"
                              variant="flat"
                              className="w-full justify-start"
                              startContent={<Plus width={16} />}
                              onPress={() => addTask(list.id)}
                            >
                              Add a card
                            </Button>
                          </div>
                        )}
                      </Droppable>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {}
            <div className="flex flex-col">
              <Card className="w-72 min-w-[280px] shadow-xl bg-default-100 flex-shrink-0">
                <div className="p-3 flex flex-col gap-2">
                  {showAddListInput ? (
                    <>
                      <input
                        className="border rounded px-2 py-1 text-sm"
                        autoFocus
                        value={newListTitle}
                        onChange={e => setNewListTitle(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') addList();
                          if (e.key === 'Escape') setShowAddListInput(false);
                        }}
                        placeholder="List title"
                      />
                      <div className="flex gap-2 mt-1">
                        <Button size="sm" onPress={addList}>
                          Add List
                        </Button>
                        <Button size="sm" variant="light" onPress={() => setShowAddListInput(false)}>
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="flat"
                      className="w-full justify-start"
                      startContent={<Plus width={16} />}
                      onPress={() => setShowAddListInput(true)}
                    >
                      Add List
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;