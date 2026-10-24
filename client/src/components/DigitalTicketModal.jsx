import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Printer, Calendar, Clock, MapPin, Ticket, ShieldCheck } from "lucide-react";

const DigitalTicketModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const qrValue = JSON.stringify({
    bookingId: booking.bookingId,
    movie: booking.movieDetails?.movieName,
    theatre: booking.theatreDetails?.theatreName,
    showDate: booking.showDate,
    showTime: booking.showTime,
    seats: booking.selectedSeats,
    userEmail: booking.userEmail,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0f172a] border border-[#1f2e46] rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between p-4 border-b border-[#1f2e46] bg-[#0a0e17] print:hidden">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#00a8e1]" />
            <h3 className="font-bold text-white text-base">Digital Box Office Pass</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#00a8e1] text-slate-950 hover:bg-[#1a98ff] transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1a2436] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Container */}
        <div id="printable-ticket" className="p-6 bg-gradient-to-b from-[#0f172a] to-[#00050d] text-slate-100">
          
          {/* Cinema Header */}
          <div className="flex items-start justify-between border-b border-dashed border-[#1f2e46] pb-4 mb-4">
            <div>
              <span className="text-xl font-black tracking-tight text-white">
                i<span className="text-[#00a8e1]">Movies</span>
              </span>
              <p className="text-xs text-[#8197a4]">Verified Cinema Admission Pass</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#00a8e1]/15 text-[#00a8e1] border border-[#00a8e1]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                {booking.paymentStatus?.toUpperCase() || "CONFIRMED"}
              </span>
              <p className="text-[11px] text-[#8197a4] mt-1 font-mono">ID: #{booking.bookingId}</p>
            </div>
          </div>

          {/* Movie Details */}
          <div className="flex gap-4 items-center mb-5">
            {booking.movieDetails?.posterUrl && (
              <img
                src={booking.movieDetails.posterUrl}
                alt={booking.movieDetails?.movieName}
                className="w-20 h-28 object-cover rounded-lg shadow-md border border-[#1f2e46] flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-black text-white truncate">
                {booking.movieDetails?.movieName || "Movie Ticket"}
              </h2>
              <p className="text-xs text-[#8197a4] mt-0.5">
                {booking.movieDetails?.language} • {booking.movieDetails?.duration || "2h 30m"}
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#00a8e1]">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="font-semibold truncate">{booking.theatreDetails?.theatreName || "Multiplex Theatre"}</span>
              </div>
            </div>
          </div>

          {/* Showtime & Venue Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#1a2436] border border-[#1f2e46] mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00a8e1]/15 text-[#00a8e1] flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#8197a4] uppercase tracking-wider font-semibold">Date</p>
                <p className="text-xs font-bold text-slate-200">{booking.showDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00a8e1]/15 text-[#00a8e1] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#8197a4] uppercase tracking-wider font-semibold">Showtime</p>
                <p className="text-xs font-bold text-slate-200">{booking.showTime}</p>
              </div>
            </div>
          </div>

          {/* Seats Display */}
          <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-[#1f2e46] mb-5">
            <p className="text-[10px] text-[#8197a4] uppercase tracking-wider font-semibold mb-1.5">
              Reserved Seats ({booking.selectedSeats?.length || 0})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {booking.selectedSeats?.map((seat) => (
                <span
                  key={seat}
                  className="px-2.5 py-1 rounded bg-[#00a8e1]/20 text-[#00a8e1] border border-[#00a8e1]/30 text-xs font-black tracking-wide"
                >
                  {seat}
                </span>
              ))}
            </div>
          </div>

          {/* QR Code and Verification info */}
          <div className="flex items-center justify-between pt-3 border-t border-dashed border-[#1f2e46]">
            <div className="space-y-1">
              <p className="text-xs text-[#8197a4]">Total Amount Paid</p>
              <p className="text-xl font-black text-[#00a8e1]">₹{booking.totalAmount}</p>
              <p className="text-[10px] text-[#8197a4]">Booked by {booking.userEmail}</p>
            </div>

            <div className="bg-white p-2 rounded-xl shadow-lg">
              <QRCodeSVG value={qrValue} size={84} level="M" />
            </div>
          </div>

          {/* Footer note */}
          <p className="text-[10px] text-[#8197a4] text-center mt-5">
            Scan this QR pass at the cinema usher station for fast priority admission.
          </p>

        </div>

      </div>
    </div>
  );
};

export default DigitalTicketModal;
