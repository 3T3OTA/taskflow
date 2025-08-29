import { Navbar, NavbarBrand, NavbarContent, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@heroui/react";
import { Logo } from "@/components/icons";
import { Search } from "lucide-react";
import CreateBoard from "@/components/dashboard/createboard";

function NavbarDashboard({ isCreateOpen, setIsCreateOpen, onBoardCreated }: { isCreateOpen?: boolean, setIsCreateOpen?: (open: boolean) => void, onBoardCreated?: () => void }) {
  return (
    <Navbar isBordered className="bg-default-50" maxWidth="xl">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Logo width={24} className="mr-1" />
          <p className="hidden sm:block font-bold text-inherit">TASKFLOW</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex flex-1 gap-4" justify="center">
        <div className="flex w-full max-w-xl items-center">
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
          />
        </div>
        <Button variant="solid" color="primary" onPress={() => setIsCreateOpen && setIsCreateOpen(true)}>Create</Button>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <div className="flex sm:hidden items-center gap-2">
          <Button isIconOnly size="sm" variant="light" aria-label="Search">
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
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <CreateBoard isOpen={!!isCreateOpen} onOpenChange={setIsCreateOpen || (() => {})} onBoardCreated={onBoardCreated} />
    </Navbar>
  )
}

export default NavbarDashboard