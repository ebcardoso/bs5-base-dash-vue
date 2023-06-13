import { datasource, getConfigs } from '@/boot/datasource'
import { UserListDTO } from '@/dto/user/UserListDTO';
import { User } from '@/models/User';

export default {
  listAll:(search:string, page:number) => {
    const url = 'api/users/?page='+page+'&search='+search;
    return datasource.get<UserListDTO>(url, getConfigs());
  },
  find:(id:string) => {
    return datasource.get('api/users/'+id, getConfigs());
  },
  create:(user:User) => {
    return datasource.post('api/users/', user, getConfigs());
  },
  update:(user:User) => {
    return datasource.patch('api/users/'+user.id+'/', user, getConfigs());
  },
  delete:(id:string) => {
    return datasource.delete('api/users/'+id, getConfigs());
  },
}
