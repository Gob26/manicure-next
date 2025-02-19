import { BadgeRussianRuble, Home, LucideIcon, MapPin, MessageSquare, User} from "lucide-react"

export interface IMenuItem {
    icon: LucideIcon
    name: string
    link: string
}



export const MENU: IMenuItem[] = [
    {
        icon: Home,
        name: 'Главная',
        link: '/auth'
    },
    { 
        icon: User,
        name: 'Кабинет',
        link: '/cabinet'
    },
    {
        icon: MapPin,
        name: 'Карта',
        link: '/map'
    },
    {
        icon: MessageSquare,
        name: 'Сообщения',
        link: '/message'
    },
    {
        icon: BadgeRussianRuble,
        name: 'Кошелек',
        link: '/money'
    }
]
