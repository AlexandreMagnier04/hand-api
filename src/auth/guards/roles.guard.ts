import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. On récupère les rôles exigés par la route (l'étiquette)
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si pas de rôle spécifique demandé, tout le monde peut passer
    if (!requiredRoles) {
      return true;
    }

    // 2. On récupère l'utilisateur (injecté par le JwtAuthGuard juste avant)
    const { user } = context.switchToHttp().getRequest();

    // 3. On vérifie si le rôle de l'utilisateur est dans la liste autorisée
    return requiredRoles.some((role) => user.role === role);
  }
}