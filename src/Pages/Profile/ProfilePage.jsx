import Dashboard from "../../Layouts/Dashboard";
import ProfileCard from "./Cards/ProfileCard";

export default function ProfilePage() {
  return (
    <Dashboard child={<Profile/>}/>
)
}

function Profile(){
    return(
        <div className="min-h-screen flex">
            <ProfileCard/>
            <div className="text-center p-10 m-15 text-white">
            <h3 className="text-2xl text-white">Last songs downloaded:</h3>
                <ul>
                    <li>G.O.M.D speaker audio</li>
                </ul>
            </div>
        </div>
    );
}