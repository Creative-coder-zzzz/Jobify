import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function CommonForm({ action, buttonText, isBtnDisabled, btnType, formControls, formData, setFormData, handleFileChange }) {
    
    function renderInputByComponentType(getCurrentControl) {
        switch (getCurrentControl.componentType) {
            case "input":
                return (
                    <div key={getCurrentControl.name} className='relative flex items-center mt-8'>
                        <Input 
                            type="text"
                            disabled={getCurrentControl.disabled}
                            placeholder={getCurrentControl.placeholder}
                            id={getCurrentControl.name}
                            name={getCurrentControl.name}
                            value={formData[getCurrentControl.name] || ""}
                            onChange={(event) => setFormData({
                                ...formData,
                                [event.target.id]: event.target.value
                            })}
                            className="w-full rounded-md h-[60px] border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
                        />
                    </div>
                );

            case "file":
                return (
                    <Label key={getCurrentControl.name} htmlFor={getCurrentControl.name} className='flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer'>
                        <h2>{getCurrentControl.label}</h2>
                        <input 
                            id={getCurrentControl.name}
                            type="file"
                            onChange={handleFileChange} // <-- Use the prop here
                            className="hidden"
                        />
                    </Label>
                );

            default:
                return null; 
        }
    }

    return (
        <form action={action}>
            {formControls.map((control) => renderInputByComponentType(control))}
            <div className='mt-6 w-full'>
                <Button 
                    type={btnType || "submit"}
                    disabled={isBtnDisabled}
                    className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
                   
                >
                    {buttonText}
                </Button>
            </div>
        </form>
    );
}

export default CommonForm;