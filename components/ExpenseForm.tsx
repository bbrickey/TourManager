"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import AddTour from "./AddTour";
import AddEvent from "./AddEvent";
import { useSession } from "next-auth/react";

type FormData = {
  userInput: {
    accountType: string;
    category: string;
    subcategory: string;
    value: number;
    tour: string;
    event: string;
    notes: string;
  }[];
};

/*
type TourData = {
  tourdata: {
    name: string;
    id: string;
  }[];
};
const ExpenseForm = ({ tourdata }: TourData) => {
  */
const ExpenseForm = () => {
  const [tour, setTour] = useState("");
  const [event, setEvent] = useState("");
  const [category, setCategory] = useState("");
  const [categoryVals, setCategoryVals] = useState([{ value: "", text: "" }]);
  const [subcategory, setSubcategory] = useState("");
  const [subcatVals, setSubcatVals] = useState([{ value: "", text: "" }]);
  const [tourData, setTourData] = useState([{ id: "", name: "" }]);
  const [eventData, setEventData] = useState([
    { id: "", name: "", tour_id: "" },
  ]);
  const [selectedTourEvents, setSelectedTourEvents] = useState([
    { id: "", name: "", tour_id: "" },
  ]);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const session = useSession();

  const expCategories = [
    { value: "tour_expense", text: "Tour Expense" },
    { value: "general_expense", text: "General Band Expense" },
    { value: "recording_expense", text: "Recording Expense" },
    { value: "merch_expense", text: "Merch Expense" },
    { value: "marketing_expense", text: "Marketing Expense" },
  ];
  const incCategories = [
    { value: "merch_income", text: "Merch Income" },
    { value: "tour_income", text: "Tour Income" },
    { value: "other_income", text: "Other Income" },
  ];
  const liabilityCategories = [{ value: "liability", text: "Liability" }];

  const expSubCatTour = [
    { value: "hotel", text: "Hotel" },
    { value: "gas", text: "Gas" },
    { value: "travel", text: "Travel Expenses" },
    { value: "payouts", text: "Band Payout" },
    { value: "other", text: "Other" },
  ];

  const expSubCatGeneral = [
    { value: "rehearsal_space", text: "Rehearsal Space" },
    { value: "equipment", text: "Equipment" },
    { value: "online_expense", text: "Online Expense" },
    { value: "travel_non_tour", text: "Travel (Non-Tour)" },
    { value: "other", text: "Other" },
  ];

  const expSubCatRecording = [
    { value: "studio_time", text: "Studio Time" },
    { value: "mixing", text: "Mixing" },
    { value: "mastering", text: "Mastering" },
    { value: "other", text: "Other" },
  ];

  const expSubCatMerch = [
    { value: "clothing", text: "Clothing" },
    { value: "physical_media", text: "Physical Media" },
    { value: "merch_design", text: "Design (merch)" },
    { value: "other", text: "Other" },
  ];

  const expSubCatPersonnel = [
    { value: "musician", text: "Musician" },
    { value: "manager", text: "Manager" },
    { value: "booking_agent", text: "Booking Agent" },
    { value: "crew", text: "Crew" },
    { value: "other", text: "Other" },
  ];

  const expSubCatMarketing = [
    { value: "public_relations", text: "PR" },
    { value: "promotions", text: "Promo" },
    { value: "design_non_merch", text: "Design (non-merch)" },
    { value: "other", text: "Other" },
  ];

  const incSubCatMerch = [
    { value: "online_merch", text: "Online Merch" },
    { value: "tour_merch", text: "Tour Merch" },
    { value: "other", text: "Other" },
  ];
  const incSubCatTour = [
    { value: "guarantee", text: "Guarantee" },
    { value: "door_deal", text: "Door Deal" },
    { value: "tips", text: "Tips" },
    { value: "other", text: "Other" },
  ];
  const incSubCatOther = [
    { value: "publishing", text: "Publishing" },
    { value: "licensing", text: "Licensing" },
    { value: "subscription", text: "Subscription" },
    { value: "advance", text: "Advance" },
    { value: "royalities", text: "Royalites" },
    { value: "other", text: "Other" },
  ];
  const LiabilitySubCat = [
    { value: "loan", text: "Loan" },
    { value: "credit_card", text: "Credit Card" },
    { value: "other", text: "Other" },
  ];

  const getTours = async () => {
    await fetch("/api/tours", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTourData(data);
        //console.log("tour data: " + tourData);
      });
  };

  const getEvents = async () => {
    await fetch("/api/event", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEventData(data);
        //console.log("event data: " + JSON.stringify(data));
      });
  };

  /*
  const getEventsFromTour = (tour: string) => {
    const filteredEvents = eventData.filter((event) => {
      return (event.id = tour);
    });
    setSelectedTourEvents(filteredEvents);
  };
  */
  const handleTourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    //if no tour selected, populate events with no tours
    if (selectedValue == "") {
      setTour(selectedValue);
      const filteredEvents = eventData.filter((event) => {
        return event.tour_id === null;
      });
      setSelectedTourEvents(filteredEvents);
    } else {
      //populate events from selected tour
      setTour(selectedValue);
      const filteredEvents = eventData.filter((event) => {
        return event.tour_id === selectedValue.toString();
      });
      setSelectedTourEvents(filteredEvents);
    }
  };

  useEffect(() => {
    getTours();
    getEvents();
  }, []);

  useEffect(() => {
    //pre-populate form with non-tour events
    //console.log("eventData " + eventData);
    const filteredEvents = eventData.filter((event) => {
      return event.tour_id === null;
    });
    setSelectedTourEvents(filteredEvents);
  }, [eventData]);

  useEffect(() => {
    if (category == "expense") {
      setCategoryVals(expCategories);
      setSubcatVals([{ value: "none", text: "" }]);
    }
    if (category == "income") {
      setCategoryVals(incCategories);
      setSubcatVals([{ value: "none", text: "" }]);
    }
    if (category == "liability") {
      setCategoryVals(liabilityCategories);
      setSubcatVals(LiabilitySubCat);
    }
  }, [category]);

  useEffect(() => {
    if (category == "expense" && subcategory == "tour_expense") {
      setSubcatVals(expSubCatTour);
    }
    if (category == "expense" && subcategory == "general_expense") {
      setSubcatVals(expSubCatGeneral);
    }
    if (category == "expense" && subcategory == "recording_expense") {
      setSubcatVals(expSubCatRecording);
    }
    if (category == "expense" && subcategory == "merch_expense") {
      setSubcatVals(expSubCatMerch);
    }
    if (category == "expense" && subcategory == "personnel_expense") {
      setSubcatVals(expSubCatPersonnel);
    }
    if (category == "expense" && subcategory == "marketing_expense") {
      setSubcatVals(expSubCatMarketing);
    }
    if (category == "income" && subcategory == "merch_income") {
      setSubcatVals(incSubCatMerch);
    }
    if (category == "income" && subcategory == "tour_income") {
      setSubcatVals(incSubCatTour);
    }
    if (category == "income" && subcategory == "other_income") {
      setSubcatVals(incSubCatOther);
    }
    if (category == "liability") {
      setSubcatVals(LiabilitySubCat);
    }
  }, [subcategory]);

  const form = useForm<FormData>({
    defaultValues: {
      userInput: [
        {
          accountType: "",
          category: "",
          subcategory: "",
          value: 0,
          tour: "",
          event: "",
          notes: "",
        },
      ],
    },
  });

  const { register, handleSubmit, control, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "userInput",
    control,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSubmitModalOpen(true);
      reset();
    }
  }),
    [isSubmitSuccessful, reset];

  const onSubmit = async (data: FormData) => {
    //console.log("Form Submitted", data);

    if (session?.status === "authenticated") {
      try {
        //console.log("TEST");
        const response = await fetch("/api/ledger", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //body: JSON.stringify({ data }),
          body: JSON.stringify(data),
        });

        const result = await response.json();
        //console.log(result); // Handle the response from the server
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      alert("You must be logged in to submit");
    }
  };

  return (
    <div>
      <div className="event-buttons">
        <div>
          <button
            className="font-roboto bg-custom text-white py-4 px-6 my-4 mx-4 rounded-md"
            onClick={() => setTourModalOpen(true)}
          >
            Add New Tour
          </button>
          {tourModalOpen && (
            <div>
              <AddTour
                open={tourModalOpen}
                onClose={() => setTourModalOpen(!tourModalOpen)}
              />
            </div>
          )}
        </div>
        <div>
          <button
            className="font-roboto bg-custom text-white py-4 px-6 my-4 mx-4 rounded-md"
            onClick={() => setEventModalOpen(true)}
          >
            Add New Event
          </button>
          {eventModalOpen && (
            <div>
              <AddEvent
                open={eventModalOpen}
                onClose={() => setEventModalOpen(!eventModalOpen)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="expense-form">
        <h1>Update Ledger</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label>Add these updates to a tour?</label>
            <select value={tour} onChange={handleTourChange}>
              <option value="">No</option>
              {tourData.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Add these updates to an event?</label>
            <select value={event} onChange={(e) => setEvent(e.target.value)}>
              <option value="">No</option>
              {/*
            <option value="no">No</option>
            <option value="event 1">Event 1</option>
            <option value="event 2">Event 2</option>
        */}

              {selectedTourEvents.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div>
              {fields.map((field, index) => {
                {
                  register(`userInput.${index}.tour`, { value: tour });
                }
                {
                  register(`userInput.${index}.event`, { value: event });
                }
                return (
                  <div className="form-control" key={field.id}>
                    <label>Account Type: </label>
                    <select
                      defaultValue=""
                      {...register(`userInput.${index}.accountType` as const, {
                        required: { value: true, message: "Field is required" },
                      })}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="" hidden disabled></option>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                      <option value="liability">Liability</option>
                    </select>
                    <p className="error">
                      {errors.userInput?.[index]?.accountType?.message}
                    </p>
                    <label>Category: </label>

                    <select
                      {...register(`userInput.${index}.category` as const, {
                        required: { value: true, message: "Field is required" },
                      })}
                      onChange={(e) => setSubcategory(e.target.value)}
                      defaultValue=""
                    >
                      <option value="" hidden disabled></option>
                      {categoryVals.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.text}
                        </option>
                      ))}
                    </select>
                    <p className="error">
                      {errors.userInput?.[index]?.category?.message}
                    </p>

                    <label>Subcategory: </label>
                    <select
                      {...register(`userInput.${index}.subcategory` as const, {
                        required: { value: true, message: "Field is required" },
                      })}
                      defaultValue=""
                    >
                      <option value="" hidden disabled></option>
                      {subcatVals.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.text}
                        </option>
                      ))}
                    </select>
                    <p className="error">
                      {errors.userInput?.[index]?.subcategory?.message}
                    </p>
                    <label>Value: </label>
                    <input
                      type="number"
                      {...register(`userInput.${index}.value` as const, {
                        valueAsNumber: true,
                        min: { value: 0, message: "Value must be positive" },
                      })}
                    ></input>
                    <p className="error">
                      {errors.userInput?.[index]?.value?.message}
                    </p>
                    <label>Notes: </label>
                    <textarea
                      {...register(`userInput.${index}.notes` as const)}
                    ></textarea>

                    {index >= 0 && (
                      <button
                        className="font-roboto bg-custom text-white py-4 px-4 my-4 mx-4 rounded-md"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Delete Expense
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <button
              type="button"
              className="font-roboto bg-custom text-white py-4 px-4 my-4 mx-4 rounded-md"
              onClick={() =>
                append({
                  accountType: "",
                  category: "",
                  subcategory: "",
                  value: 0,
                  tour: "",
                  event: "",
                  notes: "",
                })
              }
            >
              Add Another Income/Expense
            </button>
          </div>

          <button
            className="font-roboto bg-custom text-white py-4 px-4 my-4 mx-4 rounded-md"
            type="submit"
          >
            Submit
          </button>

          {submitModalOpen && (
            <div className="submit-modal">
              <h1>Submission Successful!</h1>
              <button
                className="font-roboto bg-custom text-white py-4 px-6 my-4 mx-4 rounded-md"
                onClick={() => setSubmitModalOpen(!submitModalOpen)}
              >
                Close
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
