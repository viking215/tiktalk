export interface Pageble<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
/* 
 items: [
    {
      id: 0;
      username: 'string';
      avatarUrl: 'string';
      subscribersAmount: 0;
      firstName: '';
      lastName: '';
      isActive: true;
      stack: [];
      city: '';
      description: '';
    }
  ];
  total: 0;
  page: 0;
  size: 0;
  pages: 0; */
