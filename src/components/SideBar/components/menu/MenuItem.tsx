import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store'; // Убедитесь, что путь соответствует вашей структуре проекта
import { IMenuItem } from './menu.data';

export function MenuItem({ item }: { item: IMenuItem }) {

    const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed);

    return (
        <a href={item.link} rel="noopener noreferrer" target="_blank">
            <item.icon />
            {!isCollapsed && <span>{item.name}</span>}

        </a>
    );
}
