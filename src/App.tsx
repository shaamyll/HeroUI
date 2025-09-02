import { NavbarDemo } from './components/NavBar'
import TableComponent from './components/Table'
import { Spinner } from "@heroui/react";

function App() {
  return (
    <div className="min-h-screen">
      <NavbarDemo />
      <div className="container mx-auto p-4 bg-black/85">
        <Spinner classNames={{wrapper: "text-default-500"}} size="sm" variant="simple" />
        <h1 className="text-foreground text-3xl mb-4">Shamil</h1>
        <TableComponent />
      </div>
    </div>
  );
}

export default App;