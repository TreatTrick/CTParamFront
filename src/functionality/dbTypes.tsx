export interface User{
    id?: string,
    user_name: string,
    nick_name?: string,
    password?: string,
    telephone?: string,
    is_admin: boolean,
  };

export interface UserColumn {
    id: 'user_name' | 'nick_name' | 'telephone' | 'is_admin';
    label: string;
    minWidth?: number;
    align?: 'right';
  }

export  const UserColumns: readonly UserColumn[] = [
    {
      id:'user_name',
      label: '用户名',
      minWidth: 170 },
    {
      id:'nick_name',
      label: '昵称',
      minWidth: 170,
    },
    {
      id:'telephone',
      label: '电话',
      minWidth: 170,
    },
  ];



