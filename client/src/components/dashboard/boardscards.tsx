import { Card, CardBody, CardFooter } from "@heroui/react";
import { Link } from "react-router-dom";

interface BoardType {
  id: number;
  title: string;
  image: string;
}

function BoardCardSkeleton() {
  return (
    <Card className="transition-colors duration-300">
      <div className="animate-pulse">
        <CardBody className="p-0 overflow-hidden">
          <div className="bg-gray-700/30 w-full h-25" />
        </CardBody>
        <CardFooter className="flex justify-between items-center">
          <div className="h-4 bg-gray-700/30 rounded w-3/4"></div>
        </CardFooter>
      </div>
    </Card>
  );
}

function BoardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
      {[...Array(6)].map((_, index) => (
        <BoardCardSkeleton key={index} />
      ))}
    </div>
  );
}

function BoardsCards({ boards, isLoading }: { boards: BoardType[]; isLoading: boolean }) {

  return (
    <div className="space-y-6">
      {isLoading ? (
        <BoardSkeletonGrid />
      ) : (
        <>
          {boards.length === 0 && (
            <p className="text-center text-default-500">
              You have no boards. Create a new board to get started!
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
            {boards.map((board) => (
              <Card
                key={board.id}
                className="transition-colors duration-300"
                isPressable

              >
              <Link to={`/boards/${board.id}`} key={board.id}>
                <CardBody className="p-0 overflow-hidden">
                  <img
                    src={board.image}
                    alt={board.title}
                    className="w-full h-25 object-cover"
                  />
                </CardBody>
                <CardFooter className="flex justify-between items-center">
                  <p className="text-white text-sm">{board.title}</p>
                </CardFooter>
              </Link>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BoardsCards;
