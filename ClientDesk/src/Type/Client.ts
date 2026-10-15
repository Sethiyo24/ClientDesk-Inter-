
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
