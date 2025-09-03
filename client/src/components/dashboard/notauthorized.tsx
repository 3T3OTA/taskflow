import { Button, Card } from "@heroui/react";
import { Lock, Home} from "lucide-react";
import { Link } from "@heroui/link";

function NotAuthorized(props: { message: string }) {
  return (
        <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="max-w-md w-full p-6 flex flex-col items-center text-center">
        <div className="mb-6 flex items-center justify-center text-danger-500 p-3 bg-danger-100 rounded-full">
          <Lock className="w-15 h-15 " />
        </div>
        
        <h2 className="text-2xl font-semibold text-foreground mb-2">Access Denied</h2>
        <p className="text-foreground-500 mb-6">
          {props.message}
        </p>
        
        <div className="flex gap-3">
          <Button 
            as={Link}
            color="primary"
            startContent={<Home className="w-6 h-6" />}
            href="/u/boards"
          >
            Go to Home
          </Button>
        </div>
      </Card>
    </div>
)
}

export default NotAuthorized