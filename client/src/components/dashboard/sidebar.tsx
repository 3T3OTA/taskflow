
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/react";
import { Logo } from "@/components/icons";
import { 
  Settings, 
  Users, 
  CreditCard, 
  FileText, 
  User, 
  LogOut 
} from "lucide-react";

function Sidebar() {
  return (
    <div className="flex w-16 flex-col justify-between border-e border-default-100 bg-content1/5 backdrop-blur-md">
      <div>
        <div className="inline-flex size-16 items-center justify-center">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary-100/50 text-primary">
            <Logo className="size-6" />
          </span>
        </div>

        <div className="border-t border-default-100">
          <div className="px-2">
            <div className="py-4">
              <Tooltip content="Settings" placement="right">
                <Link
                  href="#"
                  className="group relative flex justify-center rounded-lg bg-primary-100/50 px-2 py-1.5 text-primary hover:bg-primary-100"
                >
                  <Settings className="size-5" />
                </Link>
              </Tooltip>
            </div>

            <ul className="space-y-2 border-t border-default-100 pt-4">
              <li>
                <Tooltip content="Teams" placement="right">
                  <Link
                    href="#"
                    className="group relative flex justify-center rounded-lg px-2 py-1.5 text-default-500 hover:bg-default-100 hover:text-default-700 transition-colors"
                  >
                    <Users className="size-5" />
                  </Link>
                </Tooltip>
              </li>

              <li>
                <Tooltip content="Billing" placement="right">
                  <Link
                    href="#"
                    className="group relative flex justify-center rounded-lg px-2 py-1.5 text-default-500 hover:bg-default-100 hover:text-default-700 transition-colors"
                  >
                    <CreditCard className="size-5" />
                  </Link>
                </Tooltip>
              </li>

              <li>
                <Tooltip content="Invoices" placement="right">
                  <Link
                    href="#"
                    className="group relative flex justify-center rounded-lg px-2 py-1.5 text-default-500 hover:bg-default-100 hover:text-default-700 transition-colors"
                  >
                    <FileText className="size-5" />
                  </Link>
                </Tooltip>
              </li>

              <li>
                <Tooltip content="Account" placement="right">
                  <Link
                    href="#"
                    className="group relative flex justify-center rounded-lg px-2 py-1.5 text-default-500 hover:bg-default-100 hover:text-default-700 transition-colors"
                  >
                    <User className="size-5" />
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-default-100 bg-content1/5 p-2">
        <Tooltip content="Logout" placement="right">
          <Link
            href="#"
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-default-500 hover:bg-default-100 hover:text-default-700 transition-colors"
          >
            <LogOut className="size-5" />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}

export default Sidebar