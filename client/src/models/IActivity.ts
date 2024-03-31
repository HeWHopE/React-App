
export interface ActivityLog {
    id: number;
  actionType: string;
  action_description: string;
  fromColumn: string;
  toColumn: string;
  timestamp: Date;
}
