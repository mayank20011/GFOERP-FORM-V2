// import React from "react";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   PDFViewer,
// } from "@react-pdf/renderer";

// import headerImg from "../../img/GFO[1].jpg";
// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     margin: "30px 30px 30px 30px",
//   },
//   pageBorder: {
//     border: "2px solid black",
//     height: "90%",
//     width: "90%",
//     display: "flex",
//     flexDirection: "column",
//   },
//   border: {
//     border: "2px solid black",
//   },
//   smallFonts: {
//     fontSize: "12px",
//   },
//   grid: {
//     paddingLeft: "10px",
//     display: "grid",
//     rowGap: "8px",
//   },
//   deliveryItemsHeading: {
//     color: "black",
//     marginTop: "20px",
//     marginBottom: "10px",
//     fontSize: "15px",
//   },
//   row: {
//     display: "flex",
//     flexDirection: "row",
//     marginBottom: "3px",
//   },
//   sno: {
//     width: "100px",
//   },
//   products: {
//     width: "200px",
//   },
//   qty: {
//     width: "",
//   },
//   textCenter: {
//     paddingLeft: "5px",
//   },
//   textRed: {
//     color: "red",
//   },
//   grow: {
//     flexGrow: "1",
//   },
//   green: {
//     color: "green",
//   },
//   note: {
//     paddingBottom: "20px",
//     paddingLeft: "10px",
//   },
//   flex: {
//     display: "flex",
//     flexDirection: "row",
//   },
// });

// function totalCreates(data) {
//   let total = 0;
//   data.forEach((obj) => {
//     total = total + parseInt(obj.quantity);
//   });
//   return total;
// }

// // Create Document Component
// function PagePdf({ pdfData, setClients, setShowBill }) {

//   function resetAll(){
//     setClients(null);
//     setShowBill(false);
//   }
//   if(pdfData==null){
//     return <p className="text-center">Loading Pdf File <span className="animate-pulse">. . .</span></p>
//   }
//   return (
//     <>
//     <PDFViewer width="100%" height="600px">
//       <Document style={styles.pageMarginAndBorder}>
//         <Page size="A4" style={styles.page}>
//           {/* Div For Whole Pdf */}
//           <View style={[styles.pageBorder, styles.smallFonts]}>
//             {/* For Heading */}
//             <Image src={headerImg} alt="Header" />

//             <View style={styles.grid}>
//               <View style={styles.flex}>
//                 <Text>Vendor Name: </Text>
//                 <Text style={styles.textRed}>{pdfData.vendorName}</Text>
//               </View>

//               <View style={styles.flex}>
//                 <Text>Order Date: </Text>
//                 <Text style={styles.textRed}>{`${pdfData.time.date}/${pdfData.time.month}/${pdfData.time.year}`}</Text>
//                 <Text></Text>
//               </View>

//               <View style={styles.flex}>
//                 <Text>Deliver Date: </Text>
//                 <Text style={styles.textRed}>{"Next Day"}</Text>
//               </View>

//               <View style={styles.flex}>
//                 <Text>Deliver Address: </Text>
//                 <Text style={styles.textRed}>{pdfData.client}</Text>
//               </View>

//               <View style={styles.flex}>
//                 <Text>Delivery Time: </Text>
//                 <Text style={styles.textRed}>{"04:00 AM "}</Text>
//               </View>
//             </View>

//             <View style={styles.grid}>
//               <Text style={styles.deliveryItemsHeading}>Delivery Items :</Text>

//               {/* For items table view */}
//               <View>
//                 {/* row for headings */}
//                 <View style={styles.row}>
//                   <View style={[styles.sno, styles.textRed]}>
//                     <Text>Sr No.</Text>
//                   </View>
//                   <View style={[styles.products, styles.textRed]}>
//                     <Text>Products Name</Text>
//                   </View>
//                   <View style={[styles.qty, styles.textRed]}>
//                     <Text>Quantity (Creates)</Text>
//                   </View>
//                 </View>

//                 {pdfData.productsSold.map((obj, index) => (
//                   <View style={styles.row} key={index}>
//                     <View style={styles.sno}>
//                       <Text style={styles.textCenter}>{index + 1}</Text>
//                     </View>
//                     <View style={styles.products}>
//                       <Text style={styles.textCenter}>{obj.name}</Text>
//                     </View>
//                     <View style={styles.qty}>
//                       <Text style={styles.textCenter}>{obj.quantity}</Text>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             </View>

//             <View style={styles.grow}></View>

//             <View style={styles.note}>
//               <Text style={styles.green}>
//                 Note:- Total Creates = {totalCreates(pdfData.productsSold)} Creates
//               </Text>
//             </View>
//           </View>
//         </Page>
//       </Document>
//     </PDFViewer>
//     <button className="mt-5 text-white font-bold bg-green-600 py-3 px-6 rounded-md hover:scale-90 transition" onClick={()=>{resetAll()}}> Sell More</button>
//     </>
//   );
// }

// export default PagePdf;





import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import headerImg from "../../img/GFO[1].jpg";
import { saveAs } from 'file-saver';

// Create styles
const styles = StyleSheet.create({
  page: {
    margin: "30px 30px 30px 30px",
  },
  pageBorder: {
    border: "2px solid black",
    height: "90%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
  },
  border: {
    border: "2px solid black",
  },
  smallFonts: {
    fontSize: "12px",
  },
  grid: {
    paddingLeft: "10px",
    display: "grid",
    rowGap: "8px",
  },
  deliveryItemsHeading: {
    color: "black",
    marginTop: "20px",
    marginBottom: "10px",
    fontSize: "15px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "3px",
  },
  sno: {
    width: "100px",
  },
  products: {
    width: "200px",
  },
  qty: {
    width: "",
  },
  textCenter: {
    paddingLeft: "5px",
  },
  textRed: {
    color: "red",
  },
  grow: {
    flexGrow: "1",
  },
  green: {
    color: "green",
  },
  note: {
    paddingBottom: "20px",
    paddingLeft: "10px",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
  },
});

function totalCreates(data) {
  let total = 0;
  data.forEach((obj) => {
    total = total + parseInt(obj.quantity);
  });
  return total;
}

// Create Document Component
function PagePdf({ pdfData, setClients, setShowBill }) {

  console.log(pdfData);
  
  function resetAll() {
    // setClients(null);
    setShowBill(false);
  }

  function generatePdfDocument() {
    const doc = (
      <Document style={styles.pageMarginAndBorder}>
        <Page size="A4" style={styles.page}>
          {/* Div For Whole Pdf */}
          <View style={[styles.pageBorder, styles.smallFonts]}>
            {/* For Heading */}
            <Image src={headerImg} alt="Header" />

            <View style={styles.grid}>
              <View style={styles.flex}>
                <Text>Vendor Name: </Text>
                <Text style={styles.textRed}>{pdfData.vendorName}</Text>
              </View>

              <View style={styles.flex}>
                <Text>Order Date: </Text>
                <Text style={styles.textRed}>{`${pdfData.time.date}/${pdfData.time.month}/${pdfData.time.year}`}</Text>
                <Text></Text>
              </View>

              <View style={styles.flex}>
                <Text>Deliver Date: </Text>
                <Text style={styles.textRed}>{"Next Day"}</Text>
              </View>

              <View style={styles.flex}>
                <Text>Deliver Address: </Text>
                <Text style={styles.textRed}>{pdfData.client}</Text>
              </View>

              <View style={styles.flex}>
                <Text>Delivery Time: </Text>
                <Text style={styles.textRed}>{"04:00 AM "}</Text>
              </View>
            </View>

            <View style={styles.grid}>
              <Text style={styles.deliveryItemsHeading}>Delivery Items :</Text>

              {/* For items table view */}
              <View>
                {/* row for headings */}
                <View style={styles.row}>
                  <View style={[styles.sno, styles.textRed]}>
                    <Text>Sr No.</Text>
                  </View>
                  <View style={[styles.products, styles.textRed]}>
                    <Text>Products Name</Text>
                  </View>
                  <View style={[styles.qty, styles.textRed]}>
                    <Text>Quantity (Creates)</Text>
                  </View>
                </View>

                {pdfData.productsSold.map((obj, index) => (
                  <View style={styles.row} key={index}>
                    <View style={styles.sno}>
                      <Text style={styles.textCenter}>{index + 1}</Text>
                    </View>
                    <View style={styles.products}>
                      <Text style={styles.textCenter}>{obj.name}</Text>
                    </View>
                    <View style={styles.qty}>
                      <Text style={styles.textCenter}>{obj.quantity}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.grow}></View>

            <View style={styles.note}>
              <Text style={styles.green}>
                Note:- Total Creates = {totalCreates(pdfData.productsSold)} Creates
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );

    return doc;
  }

  async function handleDownloadPdf() {
    const doc = generatePdfDocument();
    const blob = await pdf(doc).toBlob();
    saveAs(blob, `${pdfData.vendorName}-${pdfData.client}-${pdfData.time.date}/${pdfData.time.month}/${pdfData.time.year}.pdf`);
  }

  if (pdfData == null) {
    return <p className="text-center">Loading Pdf File <span className="animate-pulse">. . .</span></p>
  }

  return (
    <div className="flex flex-col gap-4">
      <button className="mt-5 text-white font-bold bg-red-600 py-3 px-6 rounded-md hover:scale-90 transition w-[230px]" onClick={handleDownloadPdf}>
        Download PDF
      </button>
      <button className="mt-5 text-white font-bold bg-green-600 py-3 px-6 rounded-md hover:scale-90 transition w-[230px]" onClick={() => { resetAll() }}>
        Sell More
      </button>
    </div>
  );
}

export default PagePdf;
