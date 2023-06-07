import UsersTable from "./blocks/UsersTable"

export default function Users() {
  return (
    <div>
      <UsersTable 
        userMenuPermission={"users"}
      />
    </div>
  )
}
