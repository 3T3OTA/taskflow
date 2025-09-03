import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/react";
import { Logo } from "@/components/icons";
import { User, Kanban } from "lucide-react";
import { siteConfig } from '@/config/site'
const iconMap: Record<string, React.ElementType> = {
  boards: Kanban,
  user: User,
};

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
            <ul className="space-y-2 py-4">
              {siteConfig.sidebar.map((item: { label: string; href: string; icon: string }) => {
                const Icon = iconMap[item.icon] || null;
                return (
                  <li key={item.href} >
                    <Tooltip content={item.label} placement="right">
                      <Link
                        href={item.href}
                        className={"group relative flex justify-center rounded-lg px-2 py-1.5 text-default-500 hover:bg-default-100 hover:text-default-700 transition-colors" + (location.pathname === item.href ? " bg-primary-100/60 text-default-600 hover:bg-primary-100/50" : "")}
                      >
                        {Icon && <Icon className="size-5" />}
                      </Link>
                    </Tooltip>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar