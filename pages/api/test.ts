

import { NextApiRequest, NextApiResponse } from "next";
import { scrapeUrl } from "./utils/scrapper";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // NOTE -scraping test
   const link = 'https://medium.com/@tony.infisical/the-death-of-the-env-file-6d65bfc6ac5e';
  //   const link = 'https://www.tripadvisor.com/Attraction_Review-g189433-d21261985-Reviews-X_YLO_Wood_Design_Santorini-Santorini_Cyclades_South_Aegean.html';
    // const link = 'https://www.airbnb.com/rooms/21375511?check_in=2022-11-17&check_out=2022-11-24&guests=1&adults=1&s=67&unique_share_id=791265a6-f61c-41c3-b898-bd2a5b07ec42';
    // const link = 'https://www.amazon.co.uk/Sabrent-Rocket-Internal-Performance-SB-RKT4P-2TB/dp/B08P2CG4JK/?_encoding=UTF8&pd_rd_w=OqbP0&content-id=amzn1.sym.95764281-bb46-4648-a1bb-5570aa8e10b2&pf_rd_p=95764281-bb46-4648-a1bb-5570aa8e10b2&pf_rd_r=E8T80H8V2CKS09F4GTZP&pd_rd_wg=no8u9&pd_rd_r=28aa653f-3d49-4d73-a5ad-69f65bbd5654&ref_=pd_gw_ci_mcx_mr_hp_atf_m';
    // const link = 'https://www.amazon.de/-/en/Waterproof-Kayaking-Swimming-Snowboarding-Multi-way/dp/B07W3M89V8/?_encoding=UTF8&pd_rd_w=EqnMQ&content-id=amzn1.sym.fdf836b0-905b-458b-a7da-2c74c8069725&pf_rd_p=fdf836b0-905b-458b-a7da-2c74c8069725&pf_rd_r=5Z90TN7YKFPX3V2TCPTG&pd_rd_wg=RdDCl&pd_rd_r=d785e2ce-e4e7-483f-a21c-bfcc4bfb6b0e&ref_=pd_gw_ci_mcx_mr_hp_atf_m&th=1';
    // const link = 'https://www.booking.com/hotel/fr/ardoisiere.en-gb.html?aid=964694&app_hotel_id=6855916&checkin=2023-02-10&checkout=2023-02-17&from_sn=android&group_adults=3&group_children=0&label=Share-NlFCAH%401664220906&no_rooms=2&req_adults=3&req_children=0&room1=A%2CA%2CA';
    // const link = 'https://topkamado.com/product/topkamado-large-20-%e2%8c%8052cm-green/';
    // const link = 'https://electroline.com.cy/products/small-appliances/kitchen-appliances/fryer/ninja-ag301eu-foodi-health-grill-and-air-fryer/';
    // const link = 'https://www.sickboards.nl/en/longboard/8316-24497-blood-orange-morgan-pro-midnight-65mm-wheels.html#/2217-color-midnight_green_black';
    // const link = 'https://www.expedia.com/Bouvet-Island-Hotels-Vrbo-Property.h83682378.Hotel-Information?chkin=2023-02-10&chkout=2023-02-17&x_pwa=1&rfrr=HSR&pwa_ts=1664225184092&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jb20vSG90ZWwtU2VhcmNo&useRewards=false&rm1=a3&regionId=6351365&destination=Avoriaz+Ski+Resort%2C+Morzine%2C+Haute-Savoie%2C+France&destType=MARKET&sort=RECOMMENDED&top_dp=298&top_cur=USD&semdtl=&userIntent=&selectedRoomType=83682378&selectedRatePlan=000395dda03824374491ab0e151c67871231';
    // const link = 'https://abnb.me/jRt1GnH1Dtb';
    // const link = 'https://amzn.eu/d/9YB2LdS';
    // const link = 'https://goo.gl/maps/m99mBSWEp7qNq1mg6';
    

    res.status(200).json({ msg: await scrapeUrl(link) });


    // NOTE - nodemail with mailgun test
    // sendInviteMail({ invitedMail: 'tzimis12@hotmail.com', ownerMail: 'listybee2@gmail.com' });

    // NOTE - quick queries 
    
    
    // const test  = await prisma?.user.findUnique({});
    // const test2 = await prisma?.collaborator.findMany({});

/*     const update = await prisma?.user.update({
      where: {
        id: 24
      },
      data: {
        username: 'ekyria16',
        slug    : cuid.slug()
      }
    });
  
    res.json({ update }); */

    // res.json({ test2 });

    // res.json( await changeScraped());
    res.json(process.env.VERCEL_MAIL_URL_REDIRECT);
  }