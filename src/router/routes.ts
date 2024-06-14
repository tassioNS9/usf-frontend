
import { useAuth } from "@/stores/auth";

export default async function routes(to: any, from: any, next: any) {
  const auth = useAuth();
  if (to.matched.some((record: { meta: { requiresAuth: any; }; }) => record.meta.requiresAuth)) {
    const isAuthenticated = await auth.checkToken();
    if (!auth.isAuthenticated) {
      next({ path: '/'});
    } else {
      if (to.matched.some((record: { meta: { requiresAdmin: any; }; }) => record.meta.requiresAdmin)) {
        if (isAuthenticated.role !== 'ADMIN') {
          next({ path: '/notfound' }); // Redirecionar usuários não administradores
        } else {
          next();
    
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
}