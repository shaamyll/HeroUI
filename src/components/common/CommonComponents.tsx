import React, { 
  forwardRef, 
  useState, 
  useCallback, 
  useEffect, 
  useImperativeHandle, 
  useMemo 
} from "react";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Alert,
  Badge,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import {
  motion,
  AnimatePresence,
  type Transition,
  type VariantLabels,
  type Target,
  type TargetAndTransition,
  type AnimationType,
  type Spring
} from 'framer-motion';
import type { JSX } from "react/jsx-runtime";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}
// Types
type Animal = { label: string; key: string; description?: string };

type SvgProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  height?: number | string;
  width?: number | string;
  fill?: string;
};

// Icon Components
const MonitorMobileIcon = (props: SvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <path
      d="M10 16.95H6.21C2.84 16.95 2 16.11 2 12.74V6.74003C2 3.37003 2.84 2.53003 6.21 2.53003H16.74C20.11 2.53003 20.95 3.37003 20.95 6.74003"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M10 21.4699V16.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M2 12.95H10"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M6.73999 21.47H9.99999"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M22 12.8V18.51C22 20.88 21.41 21.47 19.04 21.47H15.49C13.12 21.47 12.53 20.88 12.53 18.51V12.8C12.53 10.43 13.12 9.83997 15.49 9.83997H19.04C21.41 9.83997 22 10.43 22 12.8Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M17.2445 18.25H17.2535"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const ShieldSecurityIcon = (props: SvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <path
      d="M10.49 2.23006L5.49997 4.11006C4.34997 4.54006 3.40997 5.90006 3.40997 7.12006V14.5501C3.40997 15.7301 4.18997 17.2801 5.13997 17.9901L9.43997 21.2001C10.85 22.2601 13.17 22.2601 14.58 21.2001L18.88 17.9901C19.83 17.2801 20.61 15.7301 20.61 14.5501V7.12006C20.61 5.89006 19.67 4.53006 18.52 4.10006L13.53 2.23006C12.68 1.92006 11.32 1.92006 10.49 2.23006Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
    <path
      d="M12 12.5V15.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
  </svg>
);

const InfoIcon = (props: SvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M12 8V13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M11.9945 16H12.0035"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const InvalidCardIcon = (props: SvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <path
      d="M10 16.95H6.21C2.84 16.95 2 16.11 2 12.74V6.74003C2 3.37003 2.84 2.53003 6.21 2.53003H16.74C20.11 2.53003 20.95 3.37003 20.95 6.74003"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M10 21.4699V16.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M2 12.95H10"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M6.73999 21.47H9.99999"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M22 12.8V18.51C22 20.88 21.41 21.47 19.04 21.47H15.49C13.12 21.47 12.53 20.88 12.53 18.51V12.8C12.53 10.43 13.12 9.83997 15.49 9.83997H19.04C21.41 9.83997 22 10.43 22 12.8Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M17.2445 18.25H17.2535"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const NotificationIcon = ({ size, height, width, ...props }: SvgProps) => (
  <svg
    fill="none"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const CheckIcon = ({ size, height, width, ...props }: SvgProps) => (
  <svg
    fill="none"
    height={size || height || 18}
    viewBox="0 0 24 24"
    width={size || width || 18}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

const UserIcon = ({ fill = "currentColor", size, height, width, ...props }: SvgProps) => (
  <svg
    data-name="Iconly/Curved/Profile"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    >
      <path
        d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
        data-name="Stroke 1"
      />
      <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
    </g>
  </svg>
);

const CameraIcon = ({ fill = "currentColor", size, height, width, ...props }: SvgProps) => (
  <svg
    fill="none"
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
      fill={fill}
      fillRule="evenodd"
    />
  </svg>
);

// Data for Autocomplete
export const AutocompleteData: Animal[] = [
  {label: "Cat", key: "cat", description: "The second most popular pet in the world"},
  {label: "Dog", key: "dog", description: "The most popular pet in the world"},
  {label: "Elephant", key: "elephant", description: "The largest land animal"},
  {label: "Lion", key: "lion", description: "The king of the jungle"},
  {label: "Tiger", key: "tiger", description: "The largest cat species"},
  {label: "Giraffe", key: "giraffe", description: "The tallest land animal"},
  {
    label: "Dolphin",
    key: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {label: "Penguin", key: "penguin", description: "A group of aquatic flightless birds"},
  {label: "Zebra", key: "zebra", description: "A several species of African equids"},
  {
    label: "Shark",
    key: "shark",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    key: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {label: "Otter", key: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
  {label: "Crocodile", key: "crocodile", description: "A large semiaquatic reptile"},
];

// START: RotatingText Component and interfaces
export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    'children' | 'transition' | 'initial' | 'animate' | 'exit'
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | TargetAndTransition;
  exit?: Target | VariantLabels;
  animatePresenceMode?: 'sync' | 'wait';
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: 'spring', damping: 25, stiffness: 300 },
      initial = { y: '100%', opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: '-120%', opacity: 0 },
      animatePresenceMode = 'wait',
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = 'first',
      loop = true,
      auto = true,
      splitBy = 'characters',
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
        return Array.from(segmenter.segment(text), segment => segment.segment);
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const currentText: string = texts[currentTextIndex];
      if (splitBy === 'characters') {
        const words = currentText.split(' ');
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1
        }));
      }
      if (splitBy === 'words') {
        return currentText.split(' ').map((word, i, arr) => ({
          characters: [word],
          needsSpace: i !== arr.length - 1
        }));
      }
      if (splitBy === 'lines') {
        return currentText.split('\n').map((line, i, arr) => ({
          characters: [line],
          needsSpace: i !== arr.length - 1
        }));
      }

      return currentText.split(splitBy).map((part, i, arr) => ({
        characters: [part],
        needsSpace: i !== arr.length - 1
      }));
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number): number => {
        const total = totalChars;
        if (staggerFrom === 'first') return index * staggerDuration;
        if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
        if (staggerFrom === 'center') {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === 'random') {
          const randomIndex = Math.floor(Math.random() * total);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs((staggerFrom as number) - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        if (onNext) onNext(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset
      }),
      [next, previous, jumpTo, reset]
    );

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    return (
      <motion.span
        className={cn('flex flex-wrap whitespace-pre-wrap relative', mainClassName)}
        {...rest}
        layout
        transition={transition}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.span
            key={currentTextIndex}
            className={cn(splitBy === 'lines' ? 'flex flex-col w-full' : 'flex flex-wrap whitespace-pre-wrap relative')}
            layout
            aria-hidden="true"
          >
            {elements.map((wordObj, wordIndex, array) => {
              const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.characters.length, 0);
              return (
                <span key={wordIndex} className={cn('inline-flex', splitLevelClassName)}>
                  {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          previousCharsCount + charIndex,
                          array.reduce((sum, word) => sum + word.characters.length, 0)
                        )
                      }}
                      className={cn('inline-block', elementLevelClassName)}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
                </span>
              );
            })}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = 'RotatingText';
// END: RotatingText Component

// Parent Component
type AccordionProps = { itemClasses?: any; defaultContent?: React.ReactNode };
type AutocompleteProps = { defaultItems?: Animal[] };
type CommonComponentsProps = {
  accordionProps?: AccordionProps;
  autocompleteProps?: AutocompleteProps;
  alertProps?: Record<string, any>;
  badgeButtonProps?: Record<string, any>;
  badgeAvatarProps?: Record<string, any>;
  buttonIconProps?: Record<string, any>;
  dropdownProps?: Record<string, any>;
  rotatingTextProps?: RotatingTextProps;
};

const CommonComponents: React.FC<CommonComponentsProps> = ({
  accordionProps,
  autocompleteProps,
  alertProps,
  badgeButtonProps,
  badgeAvatarProps,
  buttonIconProps,
  dropdownProps,
  rotatingTextProps,
}) => {
  return (
    <div className="p-8">

      {rotatingTextProps && (
        <div className="mb-8 flex flex-row flex-wrap gap-2">
          <h2 className="text-2xl font-semibold mb-4">Lyncs</h2>
          <RotatingText {...rotatingTextProps} />
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Accordion</h2>
        <AccordionComponent {...accordionProps} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Autocomplete</h2>
        <AutocompleteComponent {...autocompleteProps} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
        <AlertComponent {...alertProps} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Badges with Buttons</h2>
        <BadgeButtonComponent {...badgeButtonProps} />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Badges with Avatars</h2>
        <BadgeAvatarComponent {...badgeAvatarProps} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Buttons with Icons</h2>
        <ButtonIconComponent {...buttonIconProps} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Dropdowns</h2>
        <DropdownComponent {...dropdownProps} />
      </div>
    </div>
  );
};

// Child Components for each feature
const RotatingTextComponent = (props: JSX.IntrinsicAttributes & RotatingTextProps & React.RefAttributes<RotatingTextRef>) => <RotatingText {...props} />;

const AccordionComponent = ({ itemClasses, defaultContent }: AccordionProps) => (
  <Accordion
    className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
    itemClasses={itemClasses}
    showDivider={false}
    variant="shadow"
  >
    <AccordionItem
      key="1"
      aria-label="Connected devices"
      startContent={<MonitorMobileIcon className="text-primary" />}
      subtitle={
        <p className="flex">
          2 issues to <span className="text-primary ml-1">fix now</span>
        </p>
      }
      title="Connected devices"
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="2"
      aria-label="Apps Permissions"
      startContent={<ShieldSecurityIcon />}
      subtitle="3 apps have read permissions"
      title="Apps Permissions"
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="3"
      aria-label="Pending tasks"
      classNames={{subtitle: "text-warning"}}
      startContent={<InfoIcon className="text-warning" />}
      subtitle="Complete your profile"
      title="Pending tasks"
    >
      {defaultContent}
    </AccordionItem>
    <AccordionItem
      key="4"
      aria-label="Card expired"
      classNames={{subtitle: "text-danger"}}
      startContent={<InvalidCardIcon className="text-danger" />}
      subtitle="Please, update now"
      title={
        <p className="flex gap-1 items-center">
          Card expired
          <span className="text-default-400 text-small">*4812</span>
        </p>
      }
    >
      {defaultContent}
    </AccordionItem>
  </Accordion>
);

const AutocompleteComponent = ({ defaultItems }: AutocompleteProps) => (
  <Autocomplete
    isRequired
    className="max-w-xs"
    defaultItems={defaultItems}
    defaultSelectedKey="cat"
    label="Favorite Animal"
    placeholder="Search an animal"
  >
    {(item: Animal) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
  </Autocomplete>
);

type AlertColor = "default" | "danger" | "primary" | "secondary" | "success" | "warning";

const AlertComponent: React.FC = () => (
  <div className="flex items-center justify-center w-full">
    <div className="flex flex-col w-full">
      {(["default", "primary", "secondary", "success", "warning", "danger"] as AlertColor[]).map((color) => (
        <div key={color} className="w-full flex items-center my-3">
          <Alert color={color} title={`This is a ${color} alert`} />
        </div>
      ))}
    </div>
  </div>
);

const BadgeButtonComponent = () => (
  <Badge color="danger" content="99+" shape="circle">
    <Button isIconOnly aria-label="more than 99 notifications" radius="full" variant="light">
      <NotificationIcon size={24} />
    </Button>
  </Badge>
);

const BadgeAvatarComponent = () => (
    <div className="flex gap-5 items-center">
      <Badge color="danger" content="5">
        <Avatar radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      </Badge>
      <Badge color="success" content="" placement="bottom-right" shape="circle">
        <Avatar radius="full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      </Badge>
      <Badge color="danger" content="new" size="sm">
        <Avatar
          isBordered
          color="danger"
          radius="md"
          src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
        />
      </Badge>
      <Badge isOneChar color="success" content={<CheckIcon />} placement="bottom-right">
        <Avatar
          isBordered
          color="success"
          radius="md"
          src="https://i.pravatar.cc/300?u=a042581f4e290267072"
        />
      </Badge>
      <Badge
        isOneChar
        color="danger"
        content={<NotificationIcon size={12} />}
        placement="top-right"
        shape="circle"
      >
        <Avatar radius="full" size="lg" src="https://i.pravatar.cc/300?u=a042581f4e29026704f" />
      </Badge>
    </div>
);

const ButtonIconComponent = () => (
  <div className="flex gap-4 items-center">
    <Button color="success" endContent={<CameraIcon />}>
      Take a photo
    </Button>
    <Button color="danger" startContent={<UserIcon />} variant="bordered">
      Delete user
    </Button>
  </div>
);


const DropdownComponent = () => (
  <div className="flex items-center gap-4">
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }}
          className="transition-transform"
          description="@tonyreichert"
          name="Tony Reichert"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">@tonyreichert</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
  
);

export default CommonComponents;