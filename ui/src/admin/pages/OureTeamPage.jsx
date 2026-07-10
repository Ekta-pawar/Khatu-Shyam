import { Contact as UsersRound } from "lucide-react";

const OureTeamPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-yellow-500">Our Team</h1>
        <p className="mt-1 text-sm text-slate-500">Manage the team shown on the public site.</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white py-24 text-center">
        <UsersRound size={36} className="text-slate-300" />
        <h2 className="text-base font-semibold text-slate-700">Nothing here yet</h2>
        <p className="max-w-sm text-sm text-slate-500">
          This page is a placeholder — team management isn't built out yet.
        </p>
      </div>
    </div>
  );
};

export default OureTeamPage;
