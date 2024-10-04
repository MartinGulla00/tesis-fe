export interface Resource {
  _id: string;
  name: string;
}

export interface ResourceRole {
  _id: string;
  roleId: string;
  resourceId: Resource;
}

export interface AssignPermission {
  roleId: string;
  resourceId: string;
}
