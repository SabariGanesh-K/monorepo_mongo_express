import { EventAddModal } from "@/components/modals/EventAddModal";
import { UserConfig } from "@/context/UserConfig";
import PageCard from "@/layouts/Pagecard";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Home() {
    const {session,user}=useContext(UserConfig);
    const route = useRouter();
    useEffect(()=>{
            route.push('/event');
    },[session])
    return(
        <PageCard>

{session ? <>


<EventAddModal/>


</>  :<>
</>}
</PageCard>
    )
   
}