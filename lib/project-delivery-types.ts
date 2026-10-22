export type ProjectDeliveryDetail = {
  title: string;
  description: string;
};

export type ProjectDelivery = {
  heading?: string;
  role: string;
  summary: string;
  responsibilities: ProjectDeliveryDetail[];
  capabilities: ProjectDeliveryDetail[];
};
