import { Email, Call } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className='bg-blue-950 flex flex-col flex-grow justify-center pt-5'>
        <div className='mx-11 border-b-2 border-white'>
             <span className='text-white text-2xl font-semibold'>Contact Us</span>
        </div>
        <div className='flex flex-col pt-6 mx-11'>
          <div className="inline-block text-white">
            <Email className='mr-1'/>
            <span>CHEDemail@chedro10.com</span>
          </div>
            <div className='inline-block text-white'>
                <Call className='mr-1'/>
                <span>830-12315 or 0925162463</span>
            </div>
            <div className='pt-6 mb-3 text-white text-center md:text-right'>
                <span >©Copyright 2023 All rights reserve.</span>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
