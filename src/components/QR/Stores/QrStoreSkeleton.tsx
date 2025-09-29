import { Card, CardContent, CardHeader } from "@/components/ui/card";

const BranchSkeletonCard = () => {
    return (
        <Card className="h-full animate-pulse border-2 border-transparent">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2 w-2/3">
                        <div className="w-3 h-3 rounded-full bg-gray-300" />
                        <div className="h-5 w-3/4 bg-gray-300 rounded" />
                    </div>
                    <div className="h-5 w-24 bg-gray-300 rounded" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-4 w-full bg-gray-300 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-300 rounded mb-4" />
                <div className="flex justify-end gap-2">
                    <div className="h-8 w-8 bg-gray-300 rounded-full" />
                    <div className="h-8 w-8 bg-gray-300 rounded-full" />
                    <div className="h-8 w-8 bg-gray-300 rounded-full" />
                    <div className="h-8 w-8 bg-gray-300 rounded-full" />
                </div>
            </CardContent>
        </Card>
    );
};

export default BranchSkeletonCard;