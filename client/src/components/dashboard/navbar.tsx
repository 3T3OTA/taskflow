import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@heroui/react";
import { Logo } from "@/components/icons";
import { Search } from "lucide-react";
import CreateBoard from "@/components/dashboard/createboard";
import { useNavigate } from "react-router-dom";
import { getBoards } from "@/services/api";
import {useAuth} from '@/context/AuthContext'
import Cookies from "js-cookie";
import { siteConfig } from "@/config/site";

function NavbarDashboard({ isCreateOpen, setIsCreateOpen, onBoardCreated }: { isCreateOpen?: boolean, setIsCreateOpen?: (open: boolean) => void, onBoardCreated?: (board?: any) => void }) {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getBoards().then(setBoards).catch(() => {});
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }
    const f = boards.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
    setFiltered(f);
    setShowDropdown(f.length > 0);
  }, [search, boards]);

  const { user } = useAuth();


  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  }

  return (
    <Navbar isBordered className="bg-default-50" maxWidth="xl">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Logo width={24} className="mr-1" />
          <p className="hidden sm:block font-bold text-inherit">TASKFLOW</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex flex-1 gap-4" justify="center">
        <div className="flex w-full max-w-xl items-center relative">
          <Input
            classNames={{
              base: "w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<Search size={20} />}
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => search && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
          {showDropdown && (
            <div className="absolute top-12 left-0 w-full bg-default-100 shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto border border-default-200/40">
              {filtered.length === 0 ? (
                <div className="p-3 text-default-700 text-sm">No boards found</div>
              ) : (
                filtered.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 cursor-pointer hover:bg-default-200/30 text-default-700 flex items-center"
                    onMouseDown={() => { navigate(`/boards/${b.id}`); setShowDropdown(false); setSearch(""); }}
                  >
                    <img src={b.image} alt={b.title} className="w-6 h-6 rounded-md mr-2" />
                    {b.title}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <Button variant="solid" color="primary" onPress={() => setIsCreateOpen && setIsCreateOpen(true)}>Create</Button>
      </NavbarContent>

      {}
      <NavbarContent as="div" className="items-center sm:hidden" justify="center">
        <div className="flex w-full items-center gap-2 relative">
          {}
          {showDropdown && (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40" onClick={() => setShowDropdown(false)}>
              <div className="bg-default-100 rounded-xl shadow-xl mt-24 w-[95vw] max-w-md p-4 relative" onClick={e => e.stopPropagation()}>
                <Input
                  autoFocus
                  classNames={{
                    base: "w-full h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper:
                      "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                  }}
                  placeholder="Type to search..."
                  size="sm"
                  startContent={<Search size={20} />}
                  type="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                <div className="mt-2 max-h-64 overflow-y-auto">
                  {filtered.length === 0 && search ? (
                    <div className="p-3 text-default-700 text-sm">No boards found</div>
                  ) : (
                    filtered.map((b) => (
                      <div
                        key={b.id}
                        className="p-3 cursor-pointer hover:bg-default-200/30 text-default-700 flex items-center rounded-lg"
                        onMouseDown={() => { navigate(`/boards/${b.id}`); setShowDropdown(false); setSearch(""); }}
                      >
                        <img src={b.image} alt={b.title} className="w-6 h-6 rounded-md mr-2" />
                        {b.title}
                      </div>
                    ))
                  )}
                </div>
                <Button fullWidth variant="flat" className="mt-2" onPress={() => setShowDropdown(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <div className="flex sm:hidden items-center gap-2">
          <Button isIconOnly size="sm" variant="light" aria-label="Search" onPress={() => setShowDropdown(true)}>
            <Search size={20} />
          </Button>
          <Button variant="solid" color="primary" size="sm" onPress={() => setIsCreateOpen && setIsCreateOpen(true)}>Create</Button>
        </div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={user?.name}
              size="sm"
              src={user?.profile_picture}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <>
              {siteConfig.sidebar.map((item) => (
                <DropdownItem key={item.href} onPress={() => navigate(item.href)}>
                  {item.label}
                </DropdownItem>
              ))}
            </>
            <DropdownItem key="logout" color="danger" onPress={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <CreateBoard isOpen={!!isCreateOpen} onOpenChange={setIsCreateOpen || (() => {})} onBoardCreated={(board) => {
        if (typeof onBoardCreated === 'function') onBoardCreated(board);
        if (board && board.id) {
          navigate(`/boards/${board.id}`);
        }
      }} />
    </Navbar>
  )
}

export default NavbarDashboard