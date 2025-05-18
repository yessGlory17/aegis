import { FormProvider, useForm } from "react-hook-form";

function withForm<P>(WrappedComponent: React.ComponentType<P>) {
  function Component(props: P) {
    const form = useForm();
    return (
      <FormProvider {...form}>
        <WrappedComponent key="" {...(props as P)} />
      </FormProvider>
    );
  }

  return Component;
}

export default withForm;
