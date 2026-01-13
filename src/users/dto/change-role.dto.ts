import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class ChangeRoleDto {
    @IsNotEmpty()
    @IsEnum(UserRole, { message: 'Rôle invalide' }) // Vérifie que c'est bien admin, coach, etc.
    role: UserRole;
}