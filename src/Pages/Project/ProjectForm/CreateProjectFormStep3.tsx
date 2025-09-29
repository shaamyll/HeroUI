import React from 'react';
import { Button } from '@heroui/react';
import { Badge } from '@heroui/react';
import { Switch } from '@heroui/react';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { cn } from '@/lib/utils';
import { AlertCircle, CalendarIcon, Trash2, X } from 'lucide-react';
import CustomInput from "../../../components/common/CustomInput";
import SearchableSelect from "../../../components/Reusable/SearchableSelect";
import { Card, CardContent } from './card';

interface Member {
  id: string;
  title: string;
}

interface PHASE {
  name: string;
  manager_id?: string;
  assistant_manager_id?: string;
  members?: string[];
  startDate?: string;
  endDate?: string;
  enable_finance?: boolean;
  milestones?: any[];
}

interface PhaseFormCardProps {
  phase: PHASE;
  index: number;
  validationErrors: Record<string, string>;
  memberDetails: { [key: string]: Member };
  projectStartDate?: string;
  projectEndDate?: string;
  isDraft: boolean;
  onUpdatePhase: (index: number, updatedPhase: PHASE) => void;
  onRemovePhase: (index: number) => void;
  onValidationErrorChange: (key: string, error: string) => void;
  onShowAlert: (alert: any) => void;
  memberOptions?: { value: string; label: string }[];
  managerOptions?: { value: string; label: string }[];
}

const PhaseFormCard: React.FC<PhaseFormCardProps> = ({
  phase,
  index,
  validationErrors,
  memberDetails,
  projectStartDate,
  projectEndDate,
  isDraft,
  onUpdatePhase,
  onRemovePhase,
  onValidationErrorChange,
  onShowAlert,
  memberOptions = [],
  managerOptions = [],
}) => {
  const projectStartLabel: Date = new Date(projectStartDate || '');
  const projectEndLabel: Date = new Date(projectEndDate || '');

  const handlePhaseUpdate = (field: string, value: any) => {
    onUpdatePhase(index, { ...phase, [field]: value });
  };

  const handleMemberAdd = (selectedOptions: any) => {
    if (Array.isArray(selectedOptions)) {
      const memberIds = selectedOptions.map(opt => opt.value);
      handlePhaseUpdate('members', memberIds);
    }
  };

  const handleMemberRemove = (memberIdToRemove: string) => {
    const updatedMembers = phase.members?.filter(id => id !== memberIdToRemove) || [];
    handlePhaseUpdate('members', updatedMembers);
  };

  const handleStartDateSelect = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    if ((projectStartDate && projectEndDate) || isDraft) {
      const projectStart = new Date(projectStartDate || '');
      const projectEnd = new Date(projectEndDate || '');

      projectStart.setHours(0, 0, 0, 0);
      projectEnd.setHours(0, 0, 0, 0);

      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < projectStart) {
        onValidationErrorChange(
          `phases[${index}].startDate`,
          `Start date must be on or after ${format(projectStart, 'PPP')}.`
        );
      } else if (selectedDate > projectEnd) {
        onShowAlert({
          status: 'warning',
          description: `The selected start date is after the project end date (${format(
            projectEnd,
            'PPP'
          )}).`,
          type: 1,
        });
        onValidationErrorChange(`phases[${index}].startDate`, '');
        handlePhaseUpdate('startDate', formattedDate);
      } else {
        onValidationErrorChange(`phases[${index}].startDate`, '');
        handlePhaseUpdate('startDate', formattedDate);
      }
    } else {
      if (!isDraft) {
        onValidationErrorChange(
          `phases[${index}].startDate`,
          'Project start or end date is missing.'
        );
      } else {
        onValidationErrorChange(`phases[${index}].startDate`, '');
        handlePhaseUpdate('startDate', formattedDate);
      }
    }
  };

  const handleEndDateSelect = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (phase.startDate && selectedDate < new Date(phase.startDate)) {
      onValidationErrorChange(
        `phases[${index}].endDate`,
        'End date cannot be before the start date.'
      );
    } else if (
      projectEndDate &&
      selectedDate > new Date(projectEndDate)
    ) {
      const projectEnd = new Date(projectEndDate);
      projectEnd.setHours(0, 0, 0, 0);

      onValidationErrorChange(
        `phases[${index}].endDate`,
        `End date must be on or before ${format(projectEnd, 'PPP')}.`
      );
      handlePhaseUpdate('endDate', formattedDate);
    } else {
      onValidationErrorChange(`phases[${index}].endDate`, '');
      handlePhaseUpdate('endDate', formattedDate);
    }
  };

  // Convert phase members to selected options for SearchableSelect
  const selectedMemberOptions = (phase.members || []).map(memberId => ({
    value: memberId,
    label: memberDetails[memberId]?.title || memberId || 'Unknown Member'
  }));

  return (
    <Card className="space-y-4 rounded-xl p-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <div>
          <Badge color="primary" variant="solid">
            Phase {index + 1}
          </Badge>
          <div className="mt-2 text-sm text-gray-500">
            {phase.milestones?.length || 0} Milestone
            {(phase.milestones?.length || 0) !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Enable Finance</span>
          <Switch
            isSelected={phase?.enable_finance || false}
            onValueChange={(checked) => handlePhaseUpdate('enable_finance', checked)}
            size="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Phase Name */}
        <CustomInput
          label={
            <span>
              Phase Name
              {!isDraft && <span className="text-red-500"> *</span>}
            </span>
          }
          value={phase?.name || ''}
          placeholder="Enter phase name"
          maxLength={50}
          isRequired={!isDraft}
          isInvalid={!!validationErrors[`phases[${index}].name`]}
          errorMessage={validationErrors[`phases[${index}].name`]}
          onChange={(value) => {
            if (validationErrors[`phases[${index}].name`]) {
              onValidationErrorChange(`phases[${index}].name`, '');
            }
            handlePhaseUpdate('name', value);
          }}
        />

        {/* Phase Manager 1 */}
        <SearchableSelect
          label={
            <span>
              Phase Manager 1
              {!isDraft && <span className="text-red-500"> *</span>}
            </span>
          }
          options={managerOptions}
          placeholder="Select Phase Manager 1"
          value={managerOptions.find(opt => opt.value === phase?.manager_id) || null}
          onChange={(option: any) => {
            if (validationErrors[`phases[${index}].manager_id`]) {
              onValidationErrorChange(`phases[${index}].manager_id`, '');
            }
            handlePhaseUpdate('manager_id', option?.value || '');
          }}
          selectionMode="single"
          isRequired={!isDraft}
        />

        {/* Phase Manager 2 */}
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Phase Manager 2</span>
            {phase?.assistant_manager_id && (
              <Button
                size="sm"
                variant="light"
                onPress={() => {
                  handlePhaseUpdate('assistant_manager_id', '');
                  onValidationErrorChange(`phases[${index}].assistant_manager_id`, '');
                }}
              >
                Clear
              </Button>
            )}
          </div>
          <SearchableSelect
            options={managerOptions}
            placeholder="Select Phase Manager 2"
            value={managerOptions.find(opt => opt.value === phase?.assistant_manager_id) || null}
            onChange={(option: any) => {
              if (validationErrors[`phases[${index}].assistant_manager_id`]) {
                onValidationErrorChange(`phases[${index}].assistant_manager_id`, '');
              }
              handlePhaseUpdate('assistant_manager_id', option?.value || '');
            }}
            selectionMode="single"
          />
        </div>

        {/* Start Date */}
        <div>
          <div className="mb-1 flex flex-col text-sm font-medium text-gray-700 md:flex-row md:items-center">
            <span className="flex">
              Start Date
              {!isDraft && <span className="text-red-500"> *</span>}
            </span>
            <span className="ml-1 flex items-center text-[10px] italic text-gray-500">
              <AlertCircle className="mr-1 h-3 w-3" />
              {projectStartDate &&
                `Start date must be on or after ${format(projectStartLabel, 'PPP')}`}
            </span>
          </div>

          <Popover>
            <PopoverTrigger>
              <Button
                variant="bordered"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !phase?.startDate && 'text-muted-foreground',
                  validationErrors[`phases[${index}].startDate`] &&
                    'border-red-300 bg-red-50'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {phase?.startDate ? (
                  format(new Date(phase?.startDate), 'PPP')
                ) : (
                  <span>Pick a start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              {/* You would need to implement or import your calendar component here */}
              <div className="p-4">
                <input
                  type="date"
                  value={phase?.startDate || ''}
                  onChange={(e) => handleStartDateSelect(new Date(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </PopoverContent>
          </Popover>
          {validationErrors[`phases[${index}].startDate`] && (
            <p className="mt-1 flex items-center text-sm text-red-500">
              <AlertCircle className="mr-2 h-4 w-4" />
              {validationErrors[`phases[${index}].startDate`]}
            </p>
          )}
        </div>

        {/* End Date */}
        <div>
          <div className="mb-1 flex flex-col text-sm font-medium text-gray-700 md:flex-row md:items-center">
            <span className="flex">
              End Date
              {!isDraft && <span className="text-red-500"> *</span>}
            </span>
            <span className="ml-1 flex items-center text-[10px] italic text-gray-500">
              <AlertCircle className="mr-1 h-3 w-3" />
              {projectEndDate &&
                `End date must be before ${format(projectEndLabel, 'PPP')}`}
            </span>
          </div>

          <Popover>
            <PopoverTrigger>
              <Button
                variant="bordered"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !phase?.endDate && 'text-muted-foreground',
                  validationErrors[`phases[${index}].endDate`] &&
                    'border-red-300 bg-red-50'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {phase?.endDate ? (
                  format(new Date(phase?.endDate), 'PPP')
                ) : (
                  <span>Pick an end date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="p-4">
                <input
                  type="date"
                  value={phase?.endDate || ''}
                  onChange={(e) => handleEndDateSelect(new Date(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </PopoverContent>
          </Popover>
          {validationErrors[`phases[${index}].endDate`] && (
            <p className="mt-1 flex items-center text-sm text-red-500">
              <AlertCircle className="mr-2 h-4 w-4" />
              {validationErrors[`phases[${index}].endDate`]}
            </p>
          )}
        </div>

        {/* Phase Members */}
        <div className="md:col-span-2">
          <SearchableSelect
            label={
              <span>
                Phase Members <span className="text-xs italic">(optional)</span>
              </span>
            }
            options={memberOptions}
            placeholder="Add Members"
            value={selectedMemberOptions}
            onChange={handleMemberAdd}
            selectionMode="multiple"
            showSearch={true}
            maxSelectedDisplay={3}
          />

          {/* Phase Members List */}
          <div className="mt-4 flex flex-wrap gap-2">
            {phase.members?.map((memberId, i) => (
              <Badge
                key={i}
                color="primary"
                variant="flat"
                className="flex items-center gap-1"
              >
                {memberDetails[memberId]?.title || memberId || 'Unknown Member'}
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="h-4 w-4 min-w-0 p-0"
                  onPress={() => handleMemberRemove(memberId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Phase Button */}
      <div className="flex items-center justify-end">
        <Button
          color="danger"
          variant="bordered"
          startContent={<Trash2 className="h-4 w-4" />}
          onPress={() => onRemovePhase(index)}
        >
          Delete Phase
        </Button>
      </div>
    </Card>
  );
};

export default PhaseFormCard;