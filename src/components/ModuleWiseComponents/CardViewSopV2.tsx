import React from "react";
import {
    Card,
    CardFooter,
    Divider,
    Chip,
    Progress,
    Button,
} from "@heroui/react";
import { MdVisibility, MdEdit, MdDelete } from "react-icons/md";

// --- Internal Helper Components for Each UI Section ---

// Renders the new header style
interface CardHeaderContentProps {
    icon: React.ReactElement;
    title: string;
    badge?: React.ReactNode;
}
const CardHeaderContent = ({ icon, title, badge }: CardHeaderContentProps) => (
    <div className="flex items-center gap-4 px-4 pt-4">
        <div className="w-11 h-11 flex-shrink-0 rounded-full bg-indigo-500 text-white flex items-center justify-center">
            {React.cloneElement(icon, { className: "text-2xl" })}
        </div>
        <div className="flex flex-col">
            <h3 className="text-lg font-bold">{title}</h3>
            {badge && <Chip size="sm" variant="flat" className="h-auto py-0.5">{badge}</Chip>}
        </div>
    </div>
);

// Renders the new progress style
interface CardProgressContentProps {
    value: number;
    label: string;
}
const CardProgressContent = ({ value, label }: CardProgressContentProps) => (
    <div className="flex flex-col gap-1 px-4">
        <span className="text-xl font-bold">{label}</span>
        <Progress
            aria-label={label}
            value={value}
            color="success"
            size="sm"
            className="max-w-full"
        />
    </div>
);

// Renders the new stats section with dividers
interface StatItem {
    icon: React.ReactElement;
    value: string | number;
    label: string;
}
interface CardStatsContentProps {
    items: StatItem[];
}
const CardStatsContent = ({ items }: CardStatsContentProps) => (
    <div className="flex justify-around items-center text-center px-4">
        {items.map((stat: StatItem, index: number) => (
            <React.Fragment key={index}>
                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                        {React.cloneElement(stat.icon, { className: "text-xl text-foreground-500" })}
                        <span className="font-bold text-lg">{stat.value}</span>
                    </div>
                    <span className="text-xs text-foreground-500">{stat.label}</span>
                </div>
                {index < items.length - 1 && <Divider orientation="vertical" className="h-10" />}
            </React.Fragment>
        ))}
    </div>
);

// Renders the new categories section
interface CardCategoriesContentProps {
    title: string;
    items: string[];
}
const CardCategoriesContent = ({ title, items }: CardCategoriesContentProps) => (
    <div className="flex flex-col gap-2 px-4">
        <span className="text-base font-bold">{title}</span>
        <div className="flex flex-row flex-wrap gap-2">
            {items.map((item: string, index: number) => (
                <Chip key={index} size="sm" variant="bordered" className="py-1">
                    {item}
                </Chip>
            ))}
        </div>
    </div>
);

// Renders the new footer style
interface CardFooterContentProps {
    timestamp: string;
    actions?: Array<"view" | "edit" | "delete">;
}
const CardFooterContent = ({ timestamp, actions = [] }: CardFooterContentProps) => {
    const actionIcons = {
        view: <MdVisibility />,
        edit: <MdEdit />,
        delete: <MdDelete />,
    };

    return (
        <CardFooter className="flex items-center justify-between px-4 pb-4 pt-0">
            <span className="text-xs text-foreground-500">{timestamp}</span>
            <div className="flex items-center gap-1">
                {actions.map((action: "view" | "edit" | "delete") => (
                    <Button isIconOnly key={action} size="sm" variant="light" aria-label={action} className="text-foreground-500">
                        {actionIcons[action]}
                    </Button>
                ))}
            </div>
        </CardFooter>
    );
};


// --- Main Parent Component ---
// This assembles the new layout, adding dividers between each section.
interface CardViewSopV2Props {
  header?: CardHeaderContentProps;
  progress?: CardProgressContentProps;
  stats?: CardStatsContentProps;
  categories?: CardCategoriesContentProps;
  footer?: CardFooterContentProps;
}
const CardViewSopV2 = ({ header, progress, stats, categories, footer }: CardViewSopV2Props) => {
    // const sections = [header, progress, stats, categories, footer].filter(Boolean);

    return (
        <Card className="w-full max-w-xs p-0">
            <div className="flex flex-col gap-4">
                {header && <CardHeaderContent {...header} />}
                {progress && <CardProgressContent {...progress} />}
                {stats && <CardStatsContent {...stats} />}
                {categories && <CardCategoriesContent {...categories} />}
            </div>
            {/* The footer is rendered outside the main gap flow for different padding */}
            {footer && (
                <>
                    <Divider className="my-4" />
                    <CardFooterContent {...footer} />
                </>
            )}
        </Card>
    );
};

export default CardViewSopV2;