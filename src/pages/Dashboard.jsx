import NavbarBlock from "../components/blocks/NavbarBlock"
import SidenavBlock from "../components/blocks/SidenavBlock"

export default function Dashboard() {
  return (
    <div>
      <div className="bg-red-400">
        <NavbarBlock />
      </div>
      <div className="bg-red-500">
        <SidenavBlock />
      </div>
    </div>
  )
}