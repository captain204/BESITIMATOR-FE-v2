import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import EventDetail from "@/screens/InventsAndWorkshops/EventDetailes";




// Fetch the specific event by id


const Page = () => {


  return (
    <div className="overflow-hidden">
      <Layout>
        <AboutHeader
          title="Events-and-workshops Details"
          breadcrumbItems={[
            { label: "Home", link: "/" },
            { label: "events-and-workshops-Details" },
          ]}
        />
        <div
          className="bg-cover relative bg-center overflow-hidden"
          style={{ backgroundImage: 'url("/benifit.png")' }}
        >
          <div className="absolute inset-0 bg-white opacity-95"></div>
          <div className="relative">
           <div>

            <h1 className="text-center text-7xl">Event Detail Page </h1>
           </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Page;
