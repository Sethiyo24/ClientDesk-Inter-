App.tsx-
"import "./App.css";
import ClientForm from "./Components/ClientForm";
import { useState , useEffect } from "react";
import type { ClientFormData , Client } from "./Type/Client";
import "./Components/Client.css";
import ClientList from "./Components/ClientList";

function App() {

  // const storedClients = JSON.parse(localStorage.getItem("clients") || "[]");

  const [clients, setClients] = useState<Client[]>(()=>  JSON.parse(localStorage.getItem("clients") || "[]"));
  function addClient(data: ClientFormData) {
  const newClient: Client = {
    ...data,
    id: String(
    Math.max(0, ...clients.map((client) => Number(client.id))) + 1
    ),
    createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };

  setClients((previousClients) => [
    ...previousClients,
    newClient,
  ]);
}

function deleteClient(id: string) {
  setClients((previousClients) =>
    previousClients.filter((client) => client.id !== id));
}

const [editingClient, setEditingClient] = useState<Client | null>(null);
const [isFormOpen, setIsFormOpen] = useState(false);

function startEditing(client: Client) {
 setEditingClient(client);
 setIsFormOpen(true);
}

function updateClient(updatedClient: Client) {
  setClients((previousClients) =>
    previousClients.map((client) => (client.id === updatedClient.id ? updatedClient : client))
  );
}



console.log(clients);
console.log(JSON.stringify(clients));


useEffect(() => {
  localStorage.setItem("clients", JSON.stringify(clients));
}, [clients]);

  return (
    <main className="app-container">
      <section className="form-card">
        <h1>ClientDesk</h1>
        <p>Add a new client:</p>
        <button onClick={() => setIsFormOpen(!isFormOpen)}>Add Client</button>
        { isFormOpen && <ClientForm onAddClient={addClient} setIsFormOpen={setIsFormOpen} editingClient={editingClient} /> }
        <ClientList clients={clients} onDeleteClient={deleteClient} onEditClient={startEditing} />

      </section>
    </main>
  );
}

export default App;"

App.css-
".app-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.form-card {
  width: 100%;
  max-width: 90vw;
  padding: 32px;
  background-color: #2a2930;
  border: 1px solid #41404a;
  border-radius: 12px;
}

.form-card h1 {
  margin-bottom: 8px;
  text-align: center;
}

.form-card p {
  margin-bottom: 24px;
  text-align: center;
  color: #b9b8c3;
}"

ClentForm.tsx-
"import { useForm , useEffect} from "react-hook-form";
import type { Client, ClientFormData } from "../Type/Client.ts";
import "./Client.css";
interface ClientFormProps {
  onAddClient: (data: ClientFormData) => void;
  setIsFormOpen: (isFormOpen: boolean) => void;
  editingClient: Client | null;
}

const ClientForm = ({ onAddClient, setIsFormOpen , editingClient }: ClientFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>();
  useEffect(() => {
  if (editingClient) {
    reset({
      name: editingClient.name,
      company: editingClient.company,
      email: editingClient.email,
      service: editingClient.service,
      status: editingClient.status,
    });
  }
}, [editingClient, reset]);
  function submitForm(data: ClientFormData) {
    onAddClient(data);
    alert(`${data.name} added successfully!`);
    setIsFormOpen(false); 
}
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          id="name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters",
            },
          })}
        /> <br />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>
      <br /><br />
      <div>
        <label htmlFor="company" className="form-label">
          Company:
        </label>
        <input
          id="company"
          {...register("company", {
            required: "Company is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters",
            },
          })}
        /><br />
        {errors.company && (
          <span className="error">{errors.company.message}</span>
        )}
      </div>
      <br /><br />
      <div>
        <label htmlFor="email" className="form-label">
          Email-Id:
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
        /><br />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <br /><br />
      <div>
        <label htmlFor="service" className="form-label">
          Service:
        </label>
        <select
          id="service"
          {...register("service", {
            required: "Please select a service",
          })}
        >
          <option value="">Select a service</option>
          <option value="Website Development">Website Development</option>
          <option value="App Development">App Development</option>
          <option value="Automation">Automation</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="SEO">SEO</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Other">Other</option>
        </select>
         <br />
        {errors.service && (
          <span className="error">{errors.service.message}</span>
        )}
      </div>
      <br /><br />
      <div>
        <label htmlFor="status" className="form-label">
          Status:
        </label>
        <select
          id="status"
          {...register("status", {
            required: "Status is required",
          })}
        >
          <option value="">Select a status</option>
          <option value="Lead">Lead</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select><br />
        {errors.status && (
          <span className="error">{errors.status.message}</span>
        )}
      </div>
      <br /><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ClientForm;
"

Client.css-
".client-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  margin: 40px auto;
}

.client-form > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  align-items: center;
}

.client-form input,
.client-form select,
.client-form button {
  padding: 10px;
}"

ClientList.tsx-
"import type { Client } from "../Type/Client";

const ClientList = ({ clients , onDeleteClient,  onEditClient }: { clients: Client[]; onDeleteClient: (id: string) => void;  onEditClient: (client: Client) => void }) => {
  return (
    <div>
      <h2>Client List</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <strong>{client.name} {client.id}</strong> - 
            {client.company} ({client.email}) - 
            {client.service} - {client.status} - Created At: {client.createdAt} 
            - <button onClick={() =>  onEditClient(client)}>Update</button>
            <button onClick={() => onDeleteClient(client.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClientList"

Client.ts-
"
export type ClientStatus = "Lead" | "Active" | "Completed";

export type ClientService =
  | "Website Development"
  | "App Development"
  | "Automation"
  | "Digital Marketing"
  | "SEO"
  | "UI/UX Design"
  | "Other";

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  service: ClientService;
  status: ClientStatus;
  createdAt: string;
}

export type ClientFormData = Omit<
  Client,
  "id" | "createdAt"
>;
"