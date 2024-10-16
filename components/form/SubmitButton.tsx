import { Button } from "@/components/ui/button"
import Image from "next/image";


interface SubmitButtonProp {
    isLoading?: boolean
    className?: string
    children: React.ReactNode
    click?: () => void
}

const SubmitButton = ({ isLoading, className, children, click }: SubmitButtonProp) => {
    return (
        <Button type="submit" onClick={click} disabled={isLoading} className={className ?? "shad-primary-btn w-full"}>
            {isLoading ? (
                <div className="flex items-center gap-4">
                    <Image 
                        src="/assets/icons/loader.svg"
                        alt="loader"
                        width={24}
                        height={24}
                    />
                    Loading
                </div>
            ) : children }
        </Button>
    )
}

export default SubmitButton