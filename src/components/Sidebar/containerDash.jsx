import React from 'react';
import Styles from "./containerInventory.module.css";
import ChartSales from '../charts/chartSales';
import ChartEarningYear from '../charts/chartEarnings';
import ChartEarningMonth from '../charts/chartEarningsMonth';
import ChartEarningDay from '../charts/chartEatningsDay';
import ChartBestSeller from '../charts/chartBestSeller';

const ContainerDash = () => {
  return (
    <section className={Styles.containerVentas} style={{display:"flex", flexDirection:"column", height:"800px"}}>
      <div style={{width:"75vw", height:"450px",marginTop:"2vh", justifyContent:"center", alignItems:"center",boxShadow:"0 0 10px rgba(0, 0, 0, 0.5)"}}>
        <ChartSales />
      </div>
      <div style={{width:"75vw", height:"350px  ", display:"flex", flexDirection:"row",boxShadow:"0 0 10px rgba(0, 0, 0, 0.5)"}}>
        <div style={{width:"55vw", display:"flex",boxShadow:"0 0 10px rgba(0, 0, 0, 0.5)", padding:"0.3vh 0.5vw",}}>
          <ChartEarningYear />
          <ChartEarningMonth />
          <ChartEarningDay />
        </div>
        <div style={{width:"20vw",boxShadow:"0 0 10px rgba(0, 0, 0, 0.5)",padding:"0.5vh 1vw"}}>
          <ChartBestSeller />
        </div>
      </div>


    </section>
  );
}

export default ContainerDash;