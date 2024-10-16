import RegisterForm from "@/components/form/RegisterForm";
import RegisterPage from "@/components/page/RegisterPage";

export default function Home() {
    return (
        <div className="h-screen max-h-screen remove-scrollbar px-20">
            <div className="flex h-screen max-h-screen ">
                <section className="remove-scrollbar flex justify-center items-center">
                    <div className="sub-container max-w-[800px] flex-1 flex-col py-10">
					    <RegisterPage />
				    </div>
                </section>
                <section className="remove-scrollbar container flex justify-center items-center ">
                    <div className="max-w-[600px] flex-1">
                        <RegisterForm />
                    </div>
                </section>
            </div>
        </div>
    );
}
