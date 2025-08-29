
function Footer() {
  return (
    <footer className="bg-default-50 py-4">
        <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer