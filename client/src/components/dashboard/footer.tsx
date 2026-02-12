import { Link } from "@heroui/link";

function Footer() {
  return (
    <footer className="bg-default-50 py-4">
        <div className="container mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear()}. All rights reserved. Developed By{" "}
              <a
                href="https://3t3ota.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 transition-colors hover:text-primary"
              >
                3t3ota
              </a>
            </p>
        </div>
    </footer>
  )
}

export default Footer