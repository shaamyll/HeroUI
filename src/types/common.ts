export type ColorType = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

export type InputType = "email" | "password" | "text" | "search";

export interface InputConfig {
    id: string;
    type: InputType;
    label: string;
    placeholder?: string;
    defaultValue?: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
}

export interface CardBadge {
    content: string;
    color?: ColorType;
}

export interface CardHeader {
    icon?: React.ReactElement;
    title: string;
    description?: string;
    badge?: CardBadge;
}

export interface CardBodyItem {
    text: string;
    color?: ColorType;
}

export interface CardBody {
    title: string;
    items: CardBodyItem[];
}

export interface CardProgress {
    title: string;
    value: number;
    label: string;
}

export type CardAction = "view" | "edit" | "delete";

export interface CardFooter {
    timestamp: string;
    actions?: CardAction[];
}

export interface SopCardViewProps {
    header: CardHeader;
    body?: CardBody;
    progress?: CardProgress;
    footer?: CardFooter;
}