
import { Link } from "@heroui/link";
import { Card } from "@heroui/card";
import { Logo } from "@/components/icons";
import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const Footer = () => {
  return (
    <footer className="w-full ">
      <Card className="border-none rounded-none dark:bg-gray-900 shadow-none">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Logo className="text-primary h-12 w-12" />
          </div>

          <p className="mx-auto mt-6 max-w-md text-center text-default-500">
            TaskFlow Pro lets you create unlimited boards, customize lists, and organize tasks your way.
          </p>


          <ul className="mt-8 flex justify-center gap-6 md:gap-8">
            <li>
              <Link
                isExternal
                href={siteConfig.links.github}
                aria-label="GitHub"
                className="text-default-500 transition-colors hover:text-primary"
              >
                <GithubIcon className="h-6 w-6" />
              </Link>
            </li>
          </ul>
          
          <div className="mt-8 text-center text-sm text-default-400">
            <p>&copy; {new Date().getFullYear()}. All rights reserved. Developed By <Link href="https://3t3ota.me" isExternal className="text-blue-500 transition-colors hover:text-primary">3t3ota</Link></p>
          </div>
        </div>
      </Card>
    </footer>
  );
};
