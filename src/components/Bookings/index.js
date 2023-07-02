import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchBookings } from "@/store/slices/bookingsSlice";
import booking from "@/models/booking";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { AiOutlineDoubleRight } from "react-icons/ai";
import easyinvoice from "easyinvoice";

const MyBookings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      //   dispatch(clearErrors());
    }
    dispatch(fetchBookings());
  }, [dispatch]);

  const { bookings, error } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.userAuth);

  //   const setBookings = () => {};
  console.log("bookings", bookings);

  const downloadInvoice = async (booking) => {
    var data = {
      // Customize enables you to provide your own templates
      // Please review the documentation for instructions and examples
      customize: {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
      },
      images: {
        // The logo on top of your invoice
        logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
        // The invoice background
        background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
      },
      // Your own data
      sender: {
        company: "StayinEase Pvt",
        address: "Sample Street 123",
        zip: "1234 AB",
        city: "Sampletown",
        country: "Samplecountry",
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
      },
      // Your recipient
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: "4567 CD",
        city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
          "en-Us"
        )}`,
        country: `Check Out: ${new Date(booking.checkOutDate).toLocaleString(
          "en-Us"
        )}`,
        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
      },
      information: {
        // Invoice number
        number: `${booking._id}`,
        // Invoice data
        date: `${new Date(Date.now()).toLocaleString("en-Us")}`,
        // Invoice due date
        "due-date": "31-12-2023",
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          "tax-rate": 0,
          price: booking.room.pricePerNight,
        },
      ],
      // The message you would like to display on the bottom of your invoice
      "bottom-notice": "Kindly pay your invoice within 15 days.",
      // Settings to customize your invoice
      settings: {
        currency: "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
      },
      // Translate your invoice to your preferred language
      translate: {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal", // Defaults to 'Total'
        // "vat": "btw" // Defaults to 'vat'
      },
    };
    const result = await easyinvoice.createInvoice(data, function (result) {
      // The response will contain a base64 encoded PDF file
      console.log("PDF base64 string: ", result.pdf);
      easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
      // Now this result can be used to save, download or render your invoice
      // Please review the documentation below on how to do this
    });
    console.log(result);
  };

  return (
    <div className=" w-full p-8 flex flex-col items-center">
      {user ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Amount Paid</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings ? (
                bookings.map((item, index) => (
                  <tr key={index}>
                    <th>{item?._id}</th>
                    <td>
                      {new Date(item?.checkInDate).toLocaleString("en-US")}
                    </td>
                    <td>
                      {new Date(item?.checkOutDate).toLocaleString("en-US")}
                    </td>
                    <td>$ {item?.amountPaid}</td>
                    <td>
                      <div className="flex flex-row items-center ">
                        <div className="px-1">
                          <FaFileInvoiceDollar
                            onClick={() => {
                              downloadInvoice(item);
                            }}
                            color="green"
                            size={20}
                          />
                        </div>
                        <div className="mx-3 p-2 flex flex-row items-center bg-red-700 rounded-lg">
                          <div className="text-white">
                            <Link href={`/bookings/${item._id}`}>Details </Link>
                          </div>
                          <AiOutlineDoubleRight color="white" size={20} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <div> No Reviews Yet</div>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">
          Please login to check your bookings
        </div>
      )}
    </div>
  );
};

export default MyBookings;
