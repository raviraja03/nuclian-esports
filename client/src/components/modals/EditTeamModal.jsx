import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { useUpdateRegistrationDataMutation } from "../../globalState/api/tournamentApi";

function EditTeamModal({ isOpen, onClose, teamData, id, totalMember }) {
  console.log(totalMember);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      teamName: teamData?.teamName || "",
      members: teamData?.members.map((m) => ({
        gameId: m.gameId,
        gameName: m.gameName,
      })) || [{ gameId: "", gameName: "" }],
    },
  });
  const [updateRegistrationData] = useUpdateRegistrationDataMutation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });
  // update-registration

  const onSubmit = async (data) => {
    try {
      await updateRegistrationData({
        registrationId: id,
        teamName: data.teamName,
        members: data.members,
      }).unwrap();
      toast.success("Team updated successfully!");
      onClose();
    } catch (error) {
      if (error.status !== 403) {
        toast.error(
          error?.data?.message || "Failed to update team. Please try again."
        );
      }
    }
  };

  const handleAddMember = () => {
    if (fields.length >= totalMember) {
      toast.error(`Cannot add more than ${totalMember} members.`);
      return;
    }
    append({ gameId: "", gameName: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 animate-in fade-in duration-300">
      <div className="bg-[#0a141d]/90 backdrop-blur-lg rounded-xl shadow-xl p-6 w-full max-w-md border border-white/10">
        <h2 className="text-xl font-bold text-white bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] bg-clip-text  mb-5">
          Edit Team
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Team Name */}
          {totalMember > 1 && (


        
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">
              Team Name
            </label>
            <input
              {...register("teamName", { required: "Team name is required" })}
              placeholder="Enter team name"
              className={`w-full bg-[#1a232e] text-white text-sm rounded-md p-3 border ${
                errors.teamName ? "border-red-500" : "border-white/10"
              } focus:border-[#FC4E5B] focus:outline-none transition-all duration-200`}
            />
            {errors.teamName && (
              <p className="text-red-400 text-xs mt-1">
                {errors.teamName.message}
              </p>
            )}
          </div>
            )}

          {/* Members */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white">Team Members</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-3">
                <div className="flex-1 space-y-2">
                  <input
                    {...register(`members.${index}.gameId`, {
                      required: "Game ID is required",
                      minLength: { value: 3, message: "Min 3 characters" },
                      validate: (value, allValues) => {
                        const allGameIds = allValues.members
                          .map((m) => m?.gameId?.trim())
                          .filter(Boolean);
                        const duplicates = allGameIds.filter(
                          (id) => id === value.trim()
                        );
                        return duplicates.length > 1
                          ? "Game ID must be unique"
                          : true;
                      },
                    })}
                    placeholder="Game ID"
                    className={`w-full bg-[#1a232e] text-white text-sm rounded-md p-3 border ${
                      errors.members?.[index]?.gameId
                        ? "border-red-500"
                        : "border-white/10"
                    } focus:border-[#FC4E5B] focus:outline-none transition-all duration-200`}
                  />
                  {errors.members?.[index]?.gameId && (
                    <p className="text-red-400 text-xs">
                      {errors.members[index].gameId.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    {...register(`members.${index}.gameName`, {
                      required: "Game Name is required",
                    })}
                    placeholder="Game Name"
                    className={`w-full bg-[#1a232e] text-white text-sm rounded-md p-3 border ${
                      errors.members?.[index]?.gameName
                        ? "border-red-500"
                        : "border-white/10"
                    } focus:border-[#FC4E5B] focus:outline-none transition-all duration-200`}
                  />
                  {errors.members?.[index]?.gameName && (
                    <p className="text-red-400 text-xs">
                      {errors.members[index].gameName.message}
                    </p>
                  )}
                </div>
                {index !== 0 && ( // Prevent removing the leader
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-400 hover:text-red-300 text-sm p-2"
                    aria-label="Remove member"
                  >
                    <AiOutlineClose size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMember}
              className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1 disabled:opacity-50"
              disabled={fields.length >= totalMember}
            >
              <span>+</span> Add Member
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
              className="px-4 py-2 text-sm rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all duration-200"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTeamModal;
