import React from "react";
import type { ReactElement } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Progress,
  Button,
  Tooltip,
  Badge,
} from "@heroui/react";
import { 
    MdVisibility, 
    MdEdit, 
    MdDelete 
} from "react-icons/md";

export type ColorType = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

interface CardBadge {
  content: string;
  color?: ColorType;
}

interface CardHeader {
  icon?: ReactElement;
  title: string;
  description?: string;
  badge?: CardBadge;
}

interface CardBodyItem {
  text: string;
  color?: ColorType;
}

interface CardBody {
  title: string;
  items: CardBodyItem[];
}

interface CardProgress {
  title: string;
  value: number;
  label: string;
}

interface CardFooter {
  timestamp: string;
  actions?: Array<'view' | 'edit' | 'delete'>;
}

export interface SopCardViewProps {
  header: CardHeader;
  body?: CardBody;
  progress?: CardProgress;
  footer?: CardFooter;
}

// --- Internal Helper Components for Each Card Section ---

type CardHeaderContentProps = CardHeader;
type CardBodyContentProps = CardBody;
type CardProgressContentProps = CardProgress;
type CardFooterContentProps = CardFooter;

// Renders the card header based on provided data
const CardHeaderContent: React.FC<CardHeaderContentProps> = ({ icon, title, description, badge }) => (
  <CardHeader className="flex items-start gap-4">
    {icon && (
      <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        {React.cloneElement(icon, { className: "text-2xl" })}
      </div>
    )}
    <div className="flex-1">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-sm text-foreground-500">{description}</p>}
    </div>
    {badge && (
      <Badge variant="flat" className="rounded-md">
        <div className={`text-${badge.color || "default"}`}>{badge.content}</div>
      </Badge>
    )}
  </CardHeader>
);

// Renders the main body content (e.g., a list of milestones)
const CardBodyContent: React.FC<CardBodyContentProps> = ({ title, items }) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-medium">{title}</span>
    <div className="flex flex-row flex-wrap gap-2">
      {items.map((item, index) => (
        <Chip key={index} size="sm" variant="flat" color={item.color || "default"}>
          {item.text}
        </Chip>
      ))}
    </div>
  </div>
);

// Renders the progress bar section
const CardProgressContent: React.FC<CardProgressContentProps> = ({ title, value, label }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{title}</span>
      <span className="text-xs text-foreground-500">{label}</span>
    </div>
    <Progress
      aria-label={title}
      value={value}
      color="primary"
      radius="full"
      size="sm"
      showValueLabel={false}
    />
  </div>
);

// Renders the footer with a timestamp and dynamic action buttons
const CardFooterContent: React.FC<CardFooterContentProps> = ({ timestamp, actions = [] }) => {
  const actionIcons = {
    view: <MdVisibility />,
    edit: <MdEdit />,
    delete: <MdDelete />,
  };

  const actionTooltips = {
    view: "View",
    edit: "Edit",
    delete: "Delete",
  };
  
  const actionColors: Record<string, ColorType> = {
    view: "default",
    edit: "primary",
    delete: "danger",
  }

  return(
    <CardFooter className="flex items-center justify-between">
      <span className="text-xs text-foreground-500">{timestamp}</span>
      <div className="flex items-center gap-1">
        {actions.map((action) => (
          <Tooltip key={action} content={actionTooltips[action]}>
            <Button isIconOnly variant="light" aria-label={actionTooltips[action]} color={actionColors[action] || "default"}>
              {actionIcons[action]}
            </Button>
          </Tooltip>
        ))}
      </div>
    </CardFooter>
  );
};


// --- Main Parent Component ---

const SopCardView: React.FC<SopCardViewProps> = ({ header, body, progress, footer }) => {
  // Determine if a divider is needed between header and body/progress
  const needsDivider = header && (body || progress || footer);
  
  return (
    <Card className="w-full max-w-md">
      {/* Conditionally render the header */}
      {header && <CardHeaderContent {...header} />}
      
      {needsDivider && <Divider />}

      {/* Conditionally render the body. It can contain body content, progress, or both */}
      {(body || progress) && (
        <CardBody className="flex flex-col gap-5">
          {body && <CardBodyContent {...body} />}
          {progress && <CardProgressContent {...progress} />}
        </CardBody>
      )}

      {/* Conditionally render the footer */}
      {footer && <CardFooterContent {...footer} />}
    </Card>
  );
};

export default SopCardView;