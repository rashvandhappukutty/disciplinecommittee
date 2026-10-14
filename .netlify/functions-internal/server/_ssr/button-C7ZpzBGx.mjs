import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Slot, P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-C7ZpzBGx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INSTITUTION = {
	name: "KPR College of Arts, Science and Research",
	shortName: "KPRCAS",
	systemName: "DSIM",
	systemFullName: "Disciplinary & Student Incident Management System",
	preferredBranding: "KPRCAS DSIM",
	establishedYear: 2019,
	management: "KPR Charities",
	website: "https://kprcas.ac.in/",
	location: "Avinashi Road, Arasur, Coimbatore - 641407, Tamil Nadu",
	address: "Avinashi Road, Arasur",
	city: "Coimbatore",
	state: "Tamil Nadu",
	postalCode: "641407",
	phone: "0422 2635678",
	admissionPhone: "88707 00678",
	antiRaggingPhone: "1800-180-5522",
	wardenPhone: "+91 94430 88201",
	email: "info@kprcas.ac.in",
	admissionEmail: "admission@kprcas.ac.in",
	studentAffairsEmail: "studentaffairs@kprcas.ac.in",
	iccEmail: "icc@kprcas.ac.in",
	securityEmail: "security@kprcas.ac.in",
	description: "KPR College of Arts, Science and Research (KPRCAS) is committed to academic excellence, professional skill development, research-driven learning, and holistic student development.",
	logoUrl: "/kpr-logo.svg.png"
};
var kprcasSchools = [
	"School of Management",
	"School of Commerce",
	"School of IT Integrated Commerce",
	"School of Fashion",
	"School of Computing Science",
	"School of Intelligent Systems & Data Science",
	"Science & Humanities",
	"Postgraduate Programmes"
];
Object.values({
	"School of Management": [
		"B.B.A.",
		"B.B.A. (CA)",
		"B.B.A. Logistics",
		"B.B.A. International Business"
	],
	"School of Commerce": [
		"B.Com.",
		"B.Com. (PA)",
		"B.Com. (B&I)"
	],
	"School of IT Integrated Commerce": [
		"B.Com. (CA)",
		"B.Com. (BA)",
		"B.Com. (E-Com)",
		"B.Com. (IT)"
	],
	"School of Fashion": ["B.Sc. Costume Design and Fashion"],
	"School of Computing Science": [
		"B.Sc. Computer Science",
		"B.Sc. Information Technology",
		"B.Sc. Computer Technology",
		"B.C.A.",
		"B.Sc. CS with Cyber Security"
	],
	"School of Intelligent Systems & Data Science": [
		"B.Sc. Computer Science with Data Analytics",
		"B.Sc. AI & ML",
		"B.Sc. CS with AI & Data Science",
		"B.Sc. Data Science",
		"B.Sc. CS with Cloud Computing"
	],
	"Science & Humanities": ["B.Sc. Mathematics", "B.A. English"],
	"Postgraduate Programmes": ["M.Com.", "M.Sc. Data Science"]
}).flat();
var kprcasComplaintCategories = [
	"Academic Misconduct",
	"Harassment",
	"Bullying",
	"Ragging",
	"Student Misconduct",
	"Property Damage",
	"Substance-related Incident",
	"Unauthorized Activity",
	"Hostel-related Incident",
	"Campus Safety",
	"Cyber / Digital Misconduct",
	"Other"
];
var kprcasComplaintLocations = [
	"Campus Main Quadrangle",
	"Classroom",
	"Laboratory",
	"Library",
	"Hostel Block",
	"Canteen / Food Court",
	"Sports Facility",
	"Transport / Bus",
	"Parking",
	"Event / Auditorium / Venue",
	"Online / Digital",
	"Off Campus",
	"Other"
];
var now = /* @__PURE__ */ new Date();
var iso = (d) => d.toISOString();
var daysFrom = (n, h = 10, m = 0) => {
	const d = new Date(now);
	d.setDate(d.getDate() + n);
	d.setHours(h, m, 0, 0);
	return d;
};
var dateOnly = (n) => iso(daysFrom(n, 9)).slice(0, 10);
var DEPARTMENTS = [...kprcasSchools];
var ACADEMIC_YEARS = ["2025–26", "2026–27"];
var YEARS_OF_STUDY = [
	"I Year",
	"II Year",
	"III Year",
	"IV Year"
];
var SAMPLE_TRANSCRIPT = [
	{
		id: "tr-1",
		timestamp: "10:32:14 AM",
		timeOffsetSec: 14,
		speaker: "Investigator",
		speakerName: "Dr. S. Ramanathan",
		text: "Please state your full name, roll number, and explain what happened in Laboratory B-204 yesterday afternoon.",
		confidence: .98,
		audioEvidenceId: "AUD-0001",
		reviewed: true
	},
	{
		id: "tr-2",
		timestamp: "10:32:28 AM",
		timeOffsetSec: 28,
		speaker: "Student",
		speakerName: "Harish Kumar",
		text: "My name is Harish Kumar, 21CS047. The incident happened during our project work hours. We went into B-204 around 3:15 PM to test our circuit board on the digital oscilloscope.",
		confidence: .95,
		audioEvidenceId: "AUD-0001",
		reviewed: true
	},
	{
		id: "tr-3",
		timestamp: "10:33:05 AM",
		timeOffsetSec: 65,
		speaker: "Investigator",
		speakerName: "Dr. S. Ramanathan",
		text: "Did you have a signed lab requisition slip or permission from the faculty in charge?",
		confidence: .97,
		audioEvidenceId: "AUD-0001",
		reviewed: true
	},
	{
		id: "tr-4",
		timestamp: "10:33:22 AM",
		timeOffsetSec: 82,
		speaker: "Student",
		speakerName: "Harish Kumar",
		text: "No, sir. The door was open, and Sukesh said we could quickly take the readings before the evening batch arrived. I tried to shift the oscilloscope closer to bench 4, but the power cord snagged on the bench corner.",
		confidence: .91,
		audioEvidenceId: "AUD-0001",
		reviewed: true
	},
	{
		id: "tr-5",
		timestamp: "10:34:10 AM",
		timeOffsetSec: 130,
		speaker: "Witness",
		speakerName: "Sukesh R",
		text: "Yes, sir. I was holding the multimeter probe when Harish pulled the unit. It slid off the edge and the casing cracked on impact with the tile floor.",
		confidence: .72,
		flaggedUnclear: true,
		notes: "Acoustic distortion near equipment bench; confirmed in testimony review",
		audioEvidenceId: "AUD-0001",
		reviewed: true
	},
	{
		id: "tr-6",
		timestamp: "10:35:02 AM",
		timeOffsetSec: 182,
		speaker: "Investigator",
		speakerName: "Dr. S. Ramanathan",
		text: "Why was this not immediately reported to the lab technician on duty?",
		confidence: .96,
		audioEvidenceId: "AUD-0001",
		reviewed: true
	},
	{
		id: "tr-7",
		timestamp: "10:35:20 AM",
		timeOffsetSec: 200,
		speaker: "Student",
		speakerName: "Harish Kumar",
		text: "We panicked, sir. We placed the unit back on the bench and left. I sincerely apologize and I am willing to cover the repair charges.",
		confidence: .94,
		audioEvidenceId: "AUD-0001",
		reviewed: true
	}
];
var SAMPLE_SYNOPSIS = `During the investigation session held on the recorded date, the main accused, Harish Kumar (Computer Science, 3rd Year), was questioned regarding damage to equipment in Laboratory B-204.

Key statements:
• The student acknowledged being present in the laboratory between 3:10 PM and 4:00 PM without an assigned slot.
• The student stated that the oscilloscope fell during an attempt to relocate it, and denied intentional damage.
• Sukesh corroborated the timeline but stated that the equipment was moved at Harish's request.
• Amit stated he arrived after the incident and did not witness the equipment falling.

Inconsistencies noted:
• The student's account of the lab access time differs from the register entry by approximately 20 minutes.

Recommended next steps:
• Verify CCTV footage of corridor B-2.
• Obtain a written statement from the lab assistant on duty.`;
var initialCases = [
	{
		id: "DSIM-001",
		caseName: "Laboratory Incident",
		description: "Damage to an oscilloscope in Laboratory B-204 during an unscheduled session. Lab register indicates unauthorized access.",
		accusedStudent: "Harish Kumar",
		rollNumber: "KPR23CS047",
		department: "School of Computing Science",
		academicYear: "2026–27",
		yearOfStudy: "III Year",
		involvedPersons: [{
			id: "p1",
			name: "Sukesh R",
			role: "Present during incident",
			department: "School of Computing Science",
			rollNumber: "KPR23CS052"
		}, {
			id: "p2",
			name: "Amit Sharma",
			role: "Witness",
			department: "School of Computing Science",
			rollNumber: "KPR23CS008"
		}],
		status: "Under Investigation",
		investigationStart: iso(daysFrom(0, 10, 32)),
		evidence: [
			{
				id: "e1",
				number: 1,
				type: "audio",
				fileName: "statement-harish.webm",
				fileSize: "4.8 MB",
				timestamp: iso(daysFrom(-1, 10, 35)),
				capturedBy: "Discipline Committee Head",
				description: "Initial audio statement — Harish Kumar with witness interview statement",
				caseId: "DSIM-001",
				durationSec: 1023,
				status: "Verified",
				custodyHistory: [
					{
						id: "c1",
						timestamp: iso(daysFrom(-1, 10, 35)),
						action: "Evidence captured",
						performedBy: "Dr. S. Ramanathan",
						details: "Microphone recording in Inquiry Room 1"
					},
					{
						id: "c2",
						timestamp: iso(daysFrom(-1, 10, 52)),
						action: "Evidence uploaded",
						performedBy: "System (Auto-Sync)",
						details: "Encrypted AES-256 storage"
					},
					{
						id: "c3",
						timestamp: iso(daysFrom(-1, 10, 53)),
						action: "Transcript generated",
						performedBy: "DSIM AI Speech Engine",
						details: "7 speech segments recognized"
					}
				]
			},
			{
				id: "e2",
				number: 2,
				type: "photo",
				fileName: "lab-b204-bench.jpg",
				fileSize: "2.3 MB",
				timestamp: iso(daysFrom(-1, 10, 41)),
				capturedBy: "Dr. S. Ramanathan",
				description: "Workbench where equipment fell showing cord entanglement and edge damage",
				caseId: "DSIM-001",
				status: "Verified",
				custodyHistory: [{
					id: "c4",
					timestamp: iso(daysFrom(-1, 10, 41)),
					action: "Evidence captured",
					performedBy: "Dr. S. Ramanathan",
					details: "Rear camera capture 12MP"
				}, {
					id: "c5",
					timestamp: iso(daysFrom(-1, 10, 42)),
					action: "Evidence uploaded",
					performedBy: "System",
					details: "SHA-256 checksum verified"
				}]
			},
			{
				id: "e3",
				number: 3,
				type: "document",
				fileName: "lab-register-scan.pdf",
				fileSize: "1.1 MB",
				timestamp: iso(daysFrom(-1, 10, 44)),
				capturedBy: "Lab Technician Mohan",
				description: "Lab access register page 18 highlighting unscheduled entry timestamp",
				caseId: "DSIM-001",
				status: "Verified",
				custodyHistory: [{
					id: "c6",
					timestamp: iso(daysFrom(-1, 10, 44)),
					action: "Document uploaded",
					performedBy: "Mohan (Lab Tech)",
					details: "Scanned at 300 DPI"
				}]
			},
			{
				id: "e4",
				number: 4,
				type: "photo",
				fileName: "oscilloscope.jpg",
				fileSize: "3.2 MB",
				timestamp: iso(daysFrom(-1, 10, 45)),
				capturedBy: "Dr. S. Ramanathan",
				description: "Laboratory equipment oscilloscope chassis crack detail",
				caseId: "DSIM-001",
				status: "Verified",
				custodyHistory: [{
					id: "c7",
					timestamp: iso(daysFrom(-1, 10, 45)),
					action: "Photo captured",
					performedBy: "Dr. S. Ramanathan",
					details: "High-resolution damage close-up"
				}]
			}
		],
		transcript: SAMPLE_TRANSCRIPT,
		synopsis: SAMPLE_SYNOPSIS,
		investigationNotes: [{
			id: "n1",
			timestamp: iso(daysFrom(-1, 10, 40)),
			author: "Dr. S. Ramanathan",
			content: "Student provided additional information regarding the laboratory incident. Admitted to lack of faculty supervision."
		}, {
			id: "n2",
			timestamp: iso(daysFrom(-1, 10, 48)),
			author: "Dr. S. Ramanathan",
			content: "Additional person Sukesh was identified and brought into the inquiry room."
		}],
		auditLog: [
			{
				id: "a1",
				timestamp: iso(daysFrom(-30, 9, 10)),
				event: "Case created",
				user: "Dr. S. Ramanathan",
				description: "Incident registered based on Lab Incharge memo.",
				category: "case"
			},
			{
				id: "a2",
				timestamp: iso(daysFrom(-1, 10, 32)),
				event: "Investigation started",
				user: "Dr. S. Ramanathan",
				description: "Formal hearing room session opened.",
				category: "investigation"
			},
			{
				id: "a3",
				timestamp: iso(daysFrom(-1, 10, 35)),
				event: "Recording started",
				user: "Dr. S. Ramanathan",
				description: "Audio statement capture initiated for Harish Kumar.",
				category: "evidence"
			},
			{
				id: "a4",
				timestamp: iso(daysFrom(-1, 10, 41)),
				event: "Evidence added",
				user: "Dr. S. Ramanathan",
				description: "Evidence #02 (lab-b204-bench.jpg) captured and attached.",
				category: "evidence"
			},
			{
				id: "a5",
				timestamp: iso(daysFrom(-1, 10, 48)),
				event: "Person added",
				user: "Dr. S. Ramanathan",
				description: "Amit Sharma (Witness) added to inquiry roster.",
				category: "investigation"
			},
			{
				id: "a6",
				timestamp: iso(daysFrom(-1, 10, 52)),
				event: "Recording stopped",
				user: "Dr. S. Ramanathan",
				description: "Audio recording session ended. Duration: 17m 03s.",
				category: "evidence"
			},
			{
				id: "a7",
				timestamp: iso(daysFrom(-1, 10, 52)),
				event: "Transcript generated",
				user: "AI Engine",
				description: "Automated speech transcription synthesized.",
				category: "synopsis"
			},
			{
				id: "a8",
				timestamp: iso(daysFrom(-1, 10, 53)),
				event: "Synopsis generated",
				user: "AI Engine",
				description: "Initial AI synopsis produced from voice recording.",
				category: "synopsis"
			}
		],
		suspensionStartDate: dateOnly(-28),
		returnDate: dateOnly(0),
		disciplinaryAction: "Suspension",
		actionReason: "Unauthorized laboratory access and accidental equipment breakage.",
		actionNotes: "Repair cost reimbursement acknowledged. Parent undertaking submitted.",
		committeeRemarks: "First-time offense. Student demonstrated genuine remorse and cooperation.",
		timeline: [
			{
				id: "t1",
				timestamp: iso(daysFrom(-1, 10, 32)),
				event: "Investigation started",
				kind: "start"
			},
			{
				id: "t2",
				timestamp: iso(daysFrom(-1, 10, 35)),
				event: "Voice recording started",
				kind: "audio",
				evidenceRef: "Evidence #01"
			},
			{
				id: "t3",
				timestamp: iso(daysFrom(-1, 10, 41)),
				event: "Photo evidence captured",
				description: "Workbench where equipment fell",
				kind: "photo",
				evidenceRef: "Evidence #02"
			},
			{
				id: "t4",
				timestamp: iso(daysFrom(-1, 10, 48)),
				event: "Additional person added",
				description: "Amit Sharma — Witness",
				kind: "person"
			},
			{
				id: "t5",
				timestamp: iso(daysFrom(-1, 10, 52)),
				event: "Voice recording stopped",
				kind: "audio",
				evidenceRef: "Evidence #01"
			},
			{
				id: "t6",
				timestamp: iso(daysFrom(-1, 10, 52)),
				event: "AI synopsis generated",
				kind: "synopsis"
			}
		],
		createdAt: iso(daysFrom(-30, 9, 10)),
		updatedAt: iso(daysFrom(-1, 10, 52))
	},
	{
		id: "DSIM-002",
		caseName: "Unauthorized Device",
		description: "Use of a concealed wireless earpiece during the mid-semester examination in Hall E-3.",
		accusedStudent: "Arun Prakash",
		rollNumber: "KPR24AI019",
		department: "School of Intelligent Systems & Data Science",
		academicYear: "2026–27",
		yearOfStudy: "II Year",
		involvedPersons: [{
			id: "p3",
			name: "Dr. Meena Iyer",
			role: "Invigilator (reporting)",
			department: "School of Intelligent Systems & Data Science"
		}],
		status: "Decision Pending",
		investigationStart: iso(daysFrom(-6, 11, 0)),
		investigationEnd: iso(daysFrom(-6, 11, 48)),
		evidence: [{
			id: "e5",
			number: 1,
			type: "photo",
			fileName: "earpiece.jpg",
			fileSize: "1.8 MB",
			timestamp: iso(daysFrom(-6, 11, 12)),
			capturedBy: "Dr. Meena Iyer",
			description: "Confiscated wireless micro-earpiece",
			caseId: "DSIM-002",
			status: "Verified"
		}, {
			id: "e6",
			number: 2,
			type: "audio",
			fileName: "statement-arun.webm",
			fileSize: "6.2 MB",
			timestamp: iso(daysFrom(-6, 11, 20)),
			capturedBy: "Dr. S. Ramanathan",
			description: "Statement — Arun Prakash with invigilator confrontation",
			caseId: "DSIM-002",
			durationSec: 1460,
			status: "Verified"
		}],
		transcript: [
			{
				id: "tr-21",
				timestamp: "11:20:10 AM",
				speaker: "Investigator",
				speakerName: "Dr. S. Ramanathan",
				text: "Arun, invigilator Dr. Meena reported confiscating an active wireless earpiece from Hall E-3 during exam. What do you have to say?"
			},
			{
				id: "tr-22",
				timestamp: "11:20:30 AM",
				speaker: "Student",
				speakerName: "Arun Prakash",
				text: "Sir, I had it in my ear for music earlier. I forgot to take it out before entering the hall. I was not receiving answers."
			},
			{
				id: "tr-23",
				timestamp: "11:21:05 AM",
				speaker: "Invigilator",
				speakerName: "Dr. Meena Iyer",
				text: "The device was powered on with an active Bluetooth link to a smartphone stashed in his jacket on the chair."
			}
		],
		synopsis: "The student admitted to carrying the device but stated it was not used for malpractice. The invigilator reports observing repeated head tilting consistent with active communication. Bluetooth pairing logs corroborate active connection during exam hours.",
		investigationNotes: [{
			id: "in-21",
			timestamp: iso(daysFrom(-6, 11, 30)),
			author: "Dr. S. Ramanathan",
			content: "Invigilator statement recorded. Student mobile logs requested."
		}],
		auditLog: [
			{
				id: "a21",
				timestamp: iso(daysFrom(-7, 15, 30)),
				event: "Case created",
				user: "Dr. S. Ramanathan",
				description: "Report received from Examination Cell.",
				category: "case"
			},
			{
				id: "a22",
				timestamp: iso(daysFrom(-6, 11, 0)),
				event: "Investigation started",
				user: "Dr. S. Ramanathan",
				description: "Hearing commenced in Examination Committee room.",
				category: "investigation"
			},
			{
				id: "a23",
				timestamp: iso(daysFrom(-6, 11, 48)),
				event: "Investigation concluded",
				user: "Dr. S. Ramanathan",
				description: "Moved to Decision Pending stage.",
				category: "investigation"
			}
		],
		timeline: [{
			id: "t7",
			timestamp: iso(daysFrom(-6, 11, 0)),
			event: "Investigation started",
			kind: "start"
		}, {
			id: "t8",
			timestamp: iso(daysFrom(-6, 11, 12)),
			event: "Photo evidence captured",
			kind: "photo",
			evidenceRef: "Evidence #01"
		}],
		createdAt: iso(daysFrom(-7, 15, 30)),
		updatedAt: iso(daysFrom(-2, 14, 5))
	},
	{
		id: "DSIM-003",
		caseName: "Hostel Conduct Violation",
		description: "Altercation in Hostel Block C after curfew resulting in minor property damage.",
		accusedStudent: "Rahul Menon",
		rollNumber: "KPR23BA033",
		department: "School of Management",
		academicYear: "2026–27",
		yearOfStudy: "III Year",
		involvedPersons: [{
			id: "p4",
			name: "Vikram S",
			role: "Involved party",
			department: "School of Commerce",
			rollNumber: "KPR23CM011"
		}],
		status: "Suspended",
		investigationStart: iso(daysFrom(-14, 16, 0)),
		investigationEnd: iso(daysFrom(-14, 17, 20)),
		evidence: [],
		disciplinaryAction: "Suspension",
		actionReason: "Physical altercation and damage to hostel property.",
		actionNotes: "Campus hostel debarred for remaining academic semester.",
		suspensionStartDate: dateOnly(-12),
		returnDate: dateOnly(2),
		auditLog: [{
			id: "a31",
			timestamp: iso(daysFrom(-15, 9, 0)),
			event: "Case created",
			user: "Dr. S. Ramanathan",
			description: "Hostel Warden complaint lodged.",
			category: "case"
		}, {
			id: "a32",
			timestamp: iso(daysFrom(-12, 12, 0)),
			event: "Suspension created",
			user: "Dr. S. Ramanathan",
			description: "14-day suspension sanctioned with hostel eviction.",
			category: "suspension"
		}],
		timeline: [{
			id: "t9",
			timestamp: iso(daysFrom(-14, 16, 0)),
			event: "Investigation started",
			kind: "start"
		}],
		createdAt: iso(daysFrom(-15, 9, 0)),
		updatedAt: iso(daysFrom(-12, 12, 0))
	},
	{
		id: "DSIM-004",
		caseName: "Ragging Complaint",
		description: "Complaint filed by a first-year student regarding verbal harassment in the canteen.",
		accusedStudent: "Karthik Raj",
		rollNumber: "KPR23IT041",
		department: "School of IT Integrated Commerce",
		academicYear: "2026–27",
		yearOfStudy: "III Year",
		involvedPersons: [],
		status: "Awaiting Return",
		disciplinaryAction: "Suspension",
		suspensionStartDate: dateOnly(-20),
		returnDate: dateOnly(-1),
		evidence: [],
		auditLog: [{
			id: "a41",
			timestamp: iso(daysFrom(-24, 9, 0)),
			event: "Case created",
			user: "Dr. S. Ramanathan",
			description: "Anti-ragging squad referral.",
			category: "case"
		}],
		timeline: [],
		createdAt: iso(daysFrom(-24, 9, 0)),
		updatedAt: iso(daysFrom(-20, 12, 0))
	},
	{
		id: "DSIM-005",
		caseName: "Plagiarised Project Report",
		description: "Final-year project report contains substantial copied content without citations.",
		accusedStudent: "Divya Natarajan",
		rollNumber: "KPR22CM014",
		department: "School of Commerce",
		academicYear: "2025–26",
		yearOfStudy: "III Year",
		involvedPersons: [],
		status: "Closed",
		disciplinaryAction: "Warning",
		actionReason: "Academic dishonesty in minor project submission.",
		closureInfo: {
			closedAt: iso(daysFrom(-60, 12, 0)),
			closedBy: "Dr. S. Ramanathan",
			finalDecision: "Warning Issued",
			finalRemarks: "Student resubmitted an original project report following academic integrity orientation. Case resolved satisfactorily.",
			outcome: "Official warning recorded on internal disciplinary file without expulsion."
		},
		evidence: [],
		auditLog: [{
			id: "a51",
			timestamp: iso(daysFrom(-90, 9, 0)),
			event: "Case created",
			user: "Dr. S. Ramanathan",
			description: "Turnitin report attached with 68% similarity.",
			category: "case"
		}, {
			id: "a52",
			timestamp: iso(daysFrom(-60, 12, 0)),
			event: "Case closed",
			user: "Dr. S. Ramanathan",
			description: "Disciplinary case officially closed after report resubmission.",
			category: "closure"
		}],
		timeline: [{
			id: "t51",
			timestamp: iso(daysFrom(-60, 12, 0)),
			event: "Case closed",
			kind: "closed",
			description: "Warning issued. Student fulfilled remediation."
		}],
		createdAt: iso(daysFrom(-90, 9, 0)),
		updatedAt: iso(daysFrom(-60, 12, 0))
	},
	{
		id: "DSIM-006",
		caseName: "Campus Property Damage",
		description: "Damage to a parking barrier reported by security.",
		accusedStudent: "Naveen Kumar",
		rollNumber: "KPR23FD027",
		department: "School of Fashion",
		academicYear: "2026–27",
		yearOfStudy: "II Year",
		involvedPersons: [],
		status: "Draft",
		evidence: [],
		auditLog: [{
			id: "a61",
			timestamp: iso(daysFrom(-1, 17, 0)),
			event: "Case created",
			user: "Dr. S. Ramanathan",
			description: "Draft case initiated by Security Chief report.",
			category: "case"
		}],
		timeline: [],
		createdAt: iso(daysFrom(-1, 17, 0)),
		updatedAt: iso(daysFrom(-1, 17, 0))
	}
];
var initialNotifications = [
	{
		id: "n-p-1",
		recipientId: "usr_principal_000",
		recipientRole: "Principal",
		notificationKey: "NEW_COMPLAINT_SUBMITTED:CMP-001:Principal",
		type: "NEW_COMPLAINT_SUBMITTED",
		title: "New Student Complaint Submitted",
		message: "A new student complaint (CMP-001) in Hostel Issue has been submitted and is awaiting institutional review.",
		complaintId: "CMP-001",
		category: "Hostel Issue",
		priority: "HIGH",
		urgency: "urgent",
		actionUrl: "/complaints/CMP-001",
		deliveryStatus: "Delivered",
		timestamp: iso(daysFrom(0, 9, 30)),
		read: false
	},
	{
		id: "n-ao-1",
		recipientId: "usr_ao_001",
		recipientRole: "Administrative Officer",
		notificationKey: "NEW_COMPLAINT_SUBMITTED:CMP-001:Administrative Officer",
		type: "NEW_COMPLAINT_SUBMITTED",
		title: "New Student Complaint Submitted",
		message: "A new student complaint (CMP-001) in Hostel Issue has been submitted and is awaiting institutional review.",
		complaintId: "CMP-001",
		category: "Hostel Issue",
		priority: "HIGH",
		urgency: "urgent",
		actionUrl: "/complaints/CMP-001",
		deliveryStatus: "Delivered",
		timestamp: iso(daysFrom(0, 9, 30)),
		read: true,
		readAt: iso(daysFrom(0, 9, 45))
	},
	{
		id: "n-head-1",
		recipientId: "usr_head_001",
		recipientRole: "Committee Head",
		notificationKey: "NEW_COMPLAINT_SUBMITTED:CMP-001:Committee Head",
		type: "NEW_COMPLAINT_SUBMITTED",
		title: "New Complaint Requires Review",
		message: "A new student complaint (CMP-001) in Hostel Issue requires initial committee triage and review.",
		complaintId: "CMP-001",
		category: "Hostel Issue",
		priority: "HIGH",
		urgency: "urgent",
		actionUrl: "/complaints/CMP-001",
		deliveryStatus: "Delivered",
		timestamp: iso(daysFrom(0, 9, 30)),
		read: false
	},
	{
		id: "n1",
		type: "return",
		message: "Harish Kumar's suspension ends today.",
		timestamp: iso(daysFrom(0, 8, 0)),
		read: false,
		caseId: "DSIM-001"
	},
	{
		id: "n2",
		type: "synopsis",
		message: "DSIM-001 synopsis is ready for review.",
		timestamp: iso(daysFrom(-1, 10, 53)),
		read: false,
		caseId: "DSIM-001"
	},
	{
		id: "n3",
		type: "evidence",
		message: "New evidence was added to DSIM-002.",
		timestamp: iso(daysFrom(-2, 14, 5)),
		read: false,
		caseId: "DSIM-002"
	},
	{
		id: "n4",
		type: "investigation",
		message: "Investigation for DSIM-003 has been active for 2 hours.",
		timestamp: iso(daysFrom(-3, 18, 0)),
		read: true,
		caseId: "DSIM-003"
	}
];
var initialStudentProfile = {
	id: "STU-2024-001",
	name: "Arun Kumar",
	rollNumber: "KPR23CS001",
	email: "arun.cs23@kprcas.ac.in",
	department: "School of Computing Science",
	academicYear: "2026–27",
	yearOfStudy: "III Year",
	phone: "+91 94432 67890",
	photoUrl: "",
	notificationPreferences: {
		emailUpdates: true,
		smsAlerts: true,
		hearingReminders: true
	}
};
var initialStudentNotifications = [{
	id: "sn-1",
	title: "Complaint Received",
	message: "Your complaint CMP-001 has been received and assigned to the Discipline Committee.",
	timestamp: iso(daysFrom(0, 9, 31)),
	read: false,
	complaintId: "CMP-001"
}, {
	id: "sn-2",
	title: "Investigation Underway",
	message: "Complaint CMP-002 has been converted to Case DSIM-001 for formal inquiry.",
	timestamp: iso(daysFrom(-1, 11, 0)),
	read: true,
	complaintId: "CMP-002"
}];
var initialComplaints = [
	{
		id: "CMP-001",
		studentId: "STU-2024-001",
		studentName: "Arun Kumar",
		studentRoll: "KPR23CS001",
		studentEmail: "arun.cs23@kprcas.ac.in",
		studentDepartment: "School of Computing Science",
		academicYear: "2026–27",
		yearOfStudy: "III Year",
		title: "Hostel Corridor Disruption & Property Damage",
		category: "Hostel-related Incident",
		incidentDate: dateOnly(-1),
		incidentTime: "11:15 PM",
		location: "Hostel Block B, 2nd Floor Corridor",
		description: "A group of senior students caused loud disruptions after curfew hours, banged on room doors, and broke the common notice board fixture.",
		personsInvolved: [{
			id: "pi-1",
			name: "Rahul Menon",
			rollNumber: "KPR23BA033",
			department: "School of Management",
			relationship: "Student",
			isPrimary: true,
			details: "III Year student residing in Block C"
		}],
		hasWitnesses: "yes",
		witnesses: [{
			id: "w-1",
			name: "Pooja V",
			rollNumber: "KPR23CS071",
			department: "School of Computing Science",
			relationship: "Peer",
			contactInfo: "pooja.cs23@kprcas.ac.in",
			description: "Present in room B-214 during the altercation"
		}],
		evidence: [{
			id: "cev-1",
			fileName: "corridor_fixture_damage.jpg",
			fileType: "image/jpeg",
			fileSize: "2.1 MB",
			description: "Photo of shattered acrylic notice board on floor",
			uploadedAt: iso(daysFrom(0, 9, 30))
		}],
		privacyPreference: "confidential",
		urgency: "urgent",
		status: "Under Review",
		submittedAt: iso(daysFrom(0, 9, 30)),
		updatedAt: iso(daysFrom(0, 10, 0)),
		authorizedUpdates: ["Complaint registered and queued for committee review."],
		timeline: [{
			id: "ctl-1",
			timestamp: iso(daysFrom(0, 9, 30)),
			event: "Complaint Submitted",
			description: "Formal report submitted via Student Portal."
		}, {
			id: "ctl-2",
			timestamp: iso(daysFrom(0, 10, 0)),
			event: "Assigned for Review",
			description: "Queued for preliminary assessment by Committee Head."
		}]
	},
	{
		id: "CMP-002",
		studentId: "STU-2024-001",
		studentName: "Arun Kumar",
		studentRoll: "KPR23CS001",
		studentEmail: "arun.cs23@kprcas.ac.in",
		studentDepartment: "School of Computing Science",
		academicYear: "2026–27",
		yearOfStudy: "III Year",
		title: "Laboratory Equipment Breakage Incident",
		category: "Property Damage",
		incidentDate: dateOnly(-2),
		incidentTime: "3:30 PM",
		location: "Laboratory B-204",
		description: "Witnessed unscheduled lab entry and subsequent damage to laboratory test bench oscilloscope.",
		personsInvolved: [{
			id: "pi-2",
			name: "Harish Kumar",
			rollNumber: "KPR23CS047",
			department: "School of Computing Science",
			relationship: "Student",
			isPrimary: true
		}, {
			id: "pi-3",
			name: "Sukesh R",
			rollNumber: "KPR23CS052",
			department: "School of Computing Science",
			relationship: "Student",
			isPrimary: false
		}],
		hasWitnesses: "yes",
		witnesses: [{
			id: "w-2",
			name: "Amit Sharma",
			rollNumber: "KPR23CS008",
			department: "School of Computing Science",
			relationship: "Classmate"
		}],
		evidence: [{
			id: "cev-2",
			fileName: "lab_register_copy.pdf",
			fileType: "application/pdf",
			fileSize: "1.4 MB",
			description: "Scanned lab entry sheet showing time discrepancies",
			uploadedAt: iso(daysFrom(-2, 16, 0))
		}],
		privacyPreference: "identify",
		urgency: "normal",
		status: "Converted to Case",
		convertedCaseId: "DSIM-001",
		submittedAt: iso(daysFrom(-2, 16, 0)),
		updatedAt: iso(daysFrom(-1, 10, 32)),
		authorizedUpdates: [
			"Complaint accepted by Discipline Committee.",
			"Converted to formal inquiry case DSIM-001.",
			"Investigation hearing initiated."
		],
		timeline: [
			{
				id: "ctl-3",
				timestamp: iso(daysFrom(-2, 16, 0)),
				event: "Complaint Submitted",
				description: "Report registered."
			},
			{
				id: "ctl-4",
				timestamp: iso(daysFrom(-1, 10, 0)),
				event: "Complaint Accepted",
				description: "Accepted for disciplinary proceedings."
			},
			{
				id: "ctl-5",
				timestamp: iso(daysFrom(-1, 10, 32)),
				event: "Converted to Case",
				description: "Formal Case DSIM-001 initialized."
			}
		]
	},
	{
		id: "CMP-003",
		studentId: "STU-2024-001",
		studentName: "Arun Kumar",
		studentRoll: "KPR23CS001",
		studentEmail: "arun.cs23@kprcas.ac.in",
		studentDepartment: "School of Computing Science",
		academicYear: "2026–27",
		yearOfStudy: "III Year",
		title: "Canteen Verbal Harassment Report",
		category: "Harassment",
		incidentDate: dateOnly(-4),
		incidentTime: "1:15 PM",
		location: "Canteen / Food Court",
		description: "Repeated verbal remarks and hostile behavior directed toward junior students near table area 4.",
		personsInvolved: [{
			id: "pi-4",
			name: "Unidentified Senior Student",
			relationship: "Student",
			isPrimary: true,
			unknownDetails: true,
			details: "Tall male student wearing dark blue hoodie and black backpack"
		}],
		hasWitnesses: "not_sure",
		witnesses: [],
		evidence: [],
		privacyPreference: "anonymous_to_reported",
		urgency: "normal",
		status: "Additional Information Requested",
		submittedAt: iso(daysFrom(-4, 14, 0)),
		updatedAt: iso(daysFrom(-3, 11, 0)),
		infoRequests: [{
			id: "ir-1",
			requestedAt: iso(daysFrom(-3, 11, 0)),
			requestedBy: "Dr. S. Ramanathan",
			question: "Please clarify the exact approximate time and if you recall any other identifying insignia on the clothing or specific table numbers in the canteen."
		}],
		authorizedUpdates: ["Committee requested supplementary details to identify CCTV footage."],
		timeline: [{
			id: "ctl-6",
			timestamp: iso(daysFrom(-4, 14, 0)),
			event: "Complaint Submitted"
		}, {
			id: "ctl-7",
			timestamp: iso(daysFrom(-3, 11, 0)),
			event: "Information Requested",
			description: "Committee sent clarification query regarding location & timing."
		}]
	}
];
var COMMITTEE_ROLES = [
	"Principal",
	"Administrative Officer",
	"Committee Head",
	"Disciplinary Board Member"
];
var ROLE_PERMISSIONS = {
	Principal: [
		"VIEW_COMPLAINT",
		"VIEW_CASE",
		"VIEW_AUDIT",
		"EXPORT_CASE",
		"RECEIVE_NEW_COMPLAINT_ALERTS"
	],
	"Administrative Officer": [
		"VIEW_COMPLAINT",
		"VIEW_CASE",
		"VIEW_AUDIT",
		"EXPORT_CASE",
		"RECEIVE_NEW_COMPLAINT_ALERTS"
	],
	"Committee Head": [
		"VIEW_COMPLAINT",
		"REVIEW_COMPLAINT",
		"REJECT_COMPLAINT",
		"REQUEST_INFO",
		"CONVERT_TO_CASE",
		"VIEW_CASE",
		"CREATE_CASE",
		"ASSIGN_CASE",
		"INVESTIGATE_CASE",
		"CLOSE_CASE",
		"ADD_EVIDENCE",
		"VIEW_EVIDENCE",
		"UPDATE_EVIDENCE",
		"DELETE_EVIDENCE",
		"RECORD_INVESTIGATION_AUDIO",
		"VIEW_AUDIO_EVIDENCE",
		"GENERATE_TRANSCRIPT",
		"VIEW_TRANSCRIPT",
		"EDIT_TRANSCRIPT",
		"VERIFY_TRANSCRIPT",
		"GENERATE_AI_SYNOPSIS",
		"VIEW_SYNOPSIS",
		"EDIT_SYNOPSIS",
		"VERIFY_SYNOPSIS",
		"ISSUE_DECISION",
		"MANAGE_SUSPENSION",
		"MARK_RETURNED",
		"VIEW_AUDIT",
		"EXPORT_CASE",
		"MANAGE_SETTINGS",
		"ADMIN_ACCESS",
		"RECEIVE_NEW_COMPLAINT_ALERTS"
	],
	"Disciplinary Board Member": [
		"VIEW_COMPLAINT",
		"VIEW_CASE",
		"VIEW_EVIDENCE",
		"VIEW_AUDIO_EVIDENCE",
		"VIEW_TRANSCRIPT",
		"VIEW_SYNOPSIS",
		"SUBMIT_VOTE",
		"PARTICIPATE_HEARING",
		"EXPORT_CASE"
	],
	STUDENT: [
		"SUBMIT_COMPLAINT",
		"VIEW_OWN_COMPLAINT",
		"RESPOND_INFO"
	]
};
var MOCK_ACCOUNTS = {
	"principal@kprcas.ac.in": {
		id: "usr_principal_000",
		role: "Principal",
		displayName: "Principal",
		email: "principal@kprcas.ac.in",
		department: "Office of the Principal",
		permissions: ROLE_PERMISSIONS["Principal"],
		passkeyCount: 1,
		passkeysEnabled: true
	},
	"ao@kprcas.ac.in": {
		id: "usr_ao_001",
		role: "Administrative Officer",
		displayName: "Administrative Officer",
		email: "ao@kprcas.ac.in",
		department: "Administrative Affairs Office",
		permissions: ROLE_PERMISSIONS["Administrative Officer"],
		passkeyCount: 1,
		passkeysEnabled: true
	},
	"discipline.head@kprcas.ac.in": {
		id: "usr_head_001",
		role: "Committee Head",
		displayName: "Discipline Committee Head",
		email: "discipline.head@kprcas.ac.in",
		department: "Student Discipline Committee",
		permissions: ROLE_PERMISSIONS["Committee Head"],
		passkeyCount: 2,
		passkeysEnabled: true
	},
	"committee.member@kprcas.ac.in": {
		id: "usr_board_003",
		role: "Disciplinary Board Member",
		displayName: "Disciplinary Board Member",
		email: "committee.member@kprcas.ac.in",
		department: "Disciplinary Board",
		permissions: ROLE_PERMISSIONS["Disciplinary Board Member"],
		passkeyCount: 1,
		passkeysEnabled: true
	},
	"arun.cs23@kprcas.ac.in": {
		id: "usr_stu_001",
		role: "STUDENT",
		displayName: "Arun Kumar",
		email: "arun.cs23@kprcas.ac.in",
		studentId: "STU-2024-001",
		department: "School of Computing Science",
		permissions: ROLE_PERMISSIONS["STUDENT"]
	}
};
var DEFAULT_COMMITTEE_USER = MOCK_ACCOUNTS["discipline.head@kprcas.ac.in"];
var DEFAULT_STUDENT_USER = MOCK_ACCOUNTS["arun.cs23@kprcas.ac.in"];
function hasPermission(user, permission) {
	if (!user) return false;
	return user.permissions.includes(permission);
}
function isCommitteeUser(user) {
	if (!user) return false;
	return user.role !== "STUDENT" && COMMITTEE_ROLES.includes(user.role);
}
function isStudent(user) {
	if (!user) return false;
	return user.role === "STUDENT";
}
/**
* Institutional Notification Service
* Dispatches event-driven notifications to Principal, Administrative Officer, and Committee Head
* when a new student complaint is submitted.
*/
var notificationService = { 
/**
* Handle the COMPLAINT_SUBMITTED institutional event
*/
handleComplaintSubmitted(complaint, existingNotifications = []) {
	const ts = (/* @__PURE__ */ new Date()).toISOString();
	let priority = "NORMAL";
	if (complaint.urgency === "immediate_safety") priority = "URGENT";
	else if (complaint.urgency === "urgent") priority = "HIGH";
	const actionUrl = `/complaints/${complaint.id}`;
	const recipientConfigs = [
		{
			recipientId: "usr_principal_000",
			recipientRole: "Principal",
			title: "New Student Complaint Submitted",
			message: `A new student complaint (${complaint.id}) in ${complaint.category} has been submitted and is awaiting institutional review.`,
			email: "principal@kprcas.ac.in"
		},
		{
			recipientId: "usr_ao_001",
			recipientRole: "Administrative Officer",
			title: "New Student Complaint Submitted",
			message: `A new student complaint (${complaint.id}) in ${complaint.category} has been submitted and is awaiting institutional review.`,
			email: "ao@kprcas.ac.in"
		},
		{
			recipientId: "usr_head_001",
			recipientRole: "Committee Head",
			title: "New Complaint Requires Review",
			message: `A new student complaint (${complaint.id}) in ${complaint.category} requires initial committee triage and review.`,
			email: "discipline.head@kprcas.ac.in"
		}
	];
	const newNotifications = [];
	const emailDispatches = [];
	recipientConfigs.forEach((rec) => {
		const notificationKey = `NEW_COMPLAINT_SUBMITTED:${complaint.id}:${rec.recipientRole}`;
		if (!existingNotifications.some((n) => n.notificationKey === notificationKey)) {
			const notif = {
				id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
				recipientId: rec.recipientId,
				recipientRole: rec.recipientRole,
				notificationKey,
				type: "NEW_COMPLAINT_SUBMITTED",
				title: rec.title,
				message: rec.message,
				complaintId: complaint.id,
				category: complaint.category,
				priority,
				urgency: complaint.urgency,
				actionUrl,
				deliveryStatus: "Delivered",
				timestamp: ts,
				createdAt: ts,
				read: false,
				readAt: void 0
			};
			newNotifications.push(notif);
			emailDispatches.push({
				id: `email-${Date.now()}-${rec.recipientId}`,
				recipientEmail: rec.email,
				recipientRole: rec.recipientRole,
				subject: `[DSIM Alert] ${rec.title}: ${complaint.id} (${complaint.category})`,
				template: "NEW_COMPLAINT_SUBMITTED_ALERT",
				payload: {
					complaintId: complaint.id,
					category: complaint.category,
					submittedAt: ts,
					urgency: complaint.urgency,
					actionUrl
				},
				queuedAt: ts,
				status: "Queued"
			});
		}
	});
	return {
		newNotifications,
		auditEntry: {
			id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
			timestamp: ts,
			event: "Institutional Notifications Dispatched",
			user: "System Event Dispatcher",
			description: `New complaint notifications generated for authorized institutional recipients (Principal, AO, Committee Head) for ${complaint.id}.`,
			category: "complaint",
			actorRole: "System",
			action: "NOTIFY_INSTITUTIONAL_OFFICERS",
			entityType: "Complaint",
			entityId: complaint.id
		},
		emailDispatches
	};
} };
var Ctx = (0, import_react.createContext)(null);
var AUTH_KEY = "dsim-session";
var AUTH_USER_KEY = "dsim-user";
var STUDENT_AUTH_KEY = "dsim-student-session";
var STUDENT_USER_KEY = "dsim-student-user";
var SESSION_TIMESTAMP_KEY = "dsim-session-timestamp";
var uid = () => Math.random().toString(36).slice(2, 10);
function DsimProvider({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [authed, setAuthed] = (0, import_react.useState)(false);
	const [studentAuthed, setStudentAuthed] = (0, import_react.useState)(false);
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [cases, setCases] = (0, import_react.useState)(initialCases);
	const [complaints, setComplaints] = (0, import_react.useState)(initialComplaints);
	const [notifications, setNotifications] = (0, import_react.useState)(initialNotifications);
	const [studentNotifications, setStudentNotifications] = (0, import_react.useState)(initialStudentNotifications);
	const [studentProfile, setStudentProfile] = (0, import_react.useState)(initialStudentProfile);
	const [profile, setProfile] = (0, import_react.useState)({
		name: "Dr. S. Ramanathan",
		email: "discipline.head@kprcas.ac.in",
		committee: "Student Discipline Committee",
		phone: "+91 98400 12345",
		createdAt: "2024-06-12T09:00:00.000Z"
	});
	const [settings, setSettings] = (0, import_react.useState)({
		returnReminders: true,
		investigationNotifications: true,
		evidenceNotifications: true,
		synopsisNotifications: true,
		autoSynopsis: true,
		recordingQuality: "high",
		synopsisLength: "detailed",
		compactTables: false,
		requireUserVerification: true
	});
	(0, import_react.useEffect)(() => {
		try {
			const isComAuthed = localStorage.getItem(AUTH_KEY) === "1";
			const isStuAuthed = localStorage.getItem(STUDENT_AUTH_KEY) === "1";
			if (isComAuthed) {
				const storedUser = localStorage.getItem(AUTH_USER_KEY);
				if (storedUser) try {
					const parsed = JSON.parse(storedUser);
					setCurrentUser(parsed);
					setProfile((prev) => ({
						...prev,
						name: parsed.displayName,
						email: parsed.email
					}));
				} catch {
					setCurrentUser(DEFAULT_COMMITTEE_USER);
				}
				else setCurrentUser(DEFAULT_COMMITTEE_USER);
				setAuthed(true);
			} else if (isStuAuthed) {
				const storedStu = localStorage.getItem(STUDENT_USER_KEY);
				if (storedStu) try {
					setCurrentUser(JSON.parse(storedStu));
				} catch {
					setCurrentUser(DEFAULT_STUDENT_USER);
				}
				else setCurrentUser(DEFAULT_STUDENT_USER);
				setStudentAuthed(true);
			}
		} catch {} finally {
			setReady(true);
		}
	}, []);
	const touch = (c, patch) => ({
		...c,
		...patch,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	const touchComplaint = (c, patch) => ({
		...c,
		...patch,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	const hasPermission$1 = (0, import_react.useCallback)((permission) => {
		return hasPermission(currentUser, permission);
	}, [currentUser]);
	const login = (0, import_react.useCallback)((roleOrEmailOrUser) => {
		let user = DEFAULT_COMMITTEE_USER;
		if (roleOrEmailOrUser) {
			if (typeof roleOrEmailOrUser === "object" && roleOrEmailOrUser !== null) user = roleOrEmailOrUser;
			else if (typeof roleOrEmailOrUser === "string") if (roleOrEmailOrUser in MOCK_ACCOUNTS && MOCK_ACCOUNTS[roleOrEmailOrUser]) user = MOCK_ACCOUNTS[roleOrEmailOrUser];
			else {
				const foundRole = Object.values(MOCK_ACCOUNTS).find((u) => u.role.toLowerCase() === roleOrEmailOrUser.toLowerCase() || u.email.toLowerCase() === roleOrEmailOrUser.toLowerCase() || u.displayName.toLowerCase() === roleOrEmailOrUser.toLowerCase());
				if (foundRole) user = foundRole;
				else {
					const q = roleOrEmailOrUser.toLowerCase();
					const matched = Object.values(MOCK_ACCOUNTS).find((u) => q.includes("principal") && u.role === "Principal" || (q.includes("ao") || q.includes("administrative") || q.includes("admin officer")) && u.role === "Administrative Officer" || (q.includes("board") || q.includes("member")) && u.role === "Disciplinary Board Member" || (q.includes("head") || q.includes("committee")) && u.role === "Committee Head");
					if (matched) user = matched;
					else {
						const roleName = "Committee Head";
						user = {
							id: `usr_${Math.random().toString(36).slice(2, 7)}`,
							role: roleName,
							displayName: "Discipline Committee Head",
							email: "discipline.head@kprcas.ac.in",
							department: "Student Discipline Committee",
							permissions: ROLE_PERMISSIONS[roleName]
						};
					}
				}
			}
		}
		setCurrentUser(user);
		setAuthed(true);
		setStudentAuthed(false);
		try {
			localStorage.setItem(AUTH_KEY, "1");
			localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
			localStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
			localStorage.removeItem(STUDENT_AUTH_KEY);
			localStorage.removeItem(STUDENT_USER_KEY);
		} catch {}
		setProfile((prev) => ({
			...prev,
			name: user.displayName,
			email: user.email,
			committee: user.department || prev.committee
		}));
	}, []);
	const logout = (0, import_react.useCallback)(() => {
		try {
			localStorage.removeItem(AUTH_KEY);
			localStorage.removeItem(AUTH_USER_KEY);
			localStorage.removeItem(SESSION_TIMESTAMP_KEY);
		} catch {}
		setAuthed(false);
		setCurrentUser(null);
		toast.success("Signed out successfully.");
	}, []);
	const studentLogin = (0, import_react.useCallback)((emailOrRoll) => {
		const trimmed = emailOrRoll?.trim() || "";
		const user = {
			...DEFAULT_STUDENT_USER,
			id: "usr_stu_001",
			role: "STUDENT",
			displayName: "Arun Kumar",
			department: "School of Computing Science",
			permissions: ROLE_PERMISSIONS["STUDENT"],
			studentId: trimmed.startsWith("KPR") || trimmed.startsWith("22") || trimmed.startsWith("23") ? trimmed : "KPR23CS001",
			email: trimmed.includes("@") ? trimmed : "arun.cs23@kprcas.ac.in"
		};
		setCurrentUser(user);
		setStudentAuthed(true);
		setAuthed(false);
		try {
			localStorage.setItem(STUDENT_AUTH_KEY, "1");
			localStorage.setItem(STUDENT_USER_KEY, JSON.stringify(user));
			localStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
			localStorage.removeItem(AUTH_KEY);
			localStorage.removeItem(AUTH_USER_KEY);
		} catch {}
	}, []);
	const studentLogout = (0, import_react.useCallback)(() => {
		try {
			localStorage.removeItem(STUDENT_AUTH_KEY);
			localStorage.removeItem(STUDENT_USER_KEY);
			localStorage.removeItem(SESSION_TIMESTAMP_KEY);
		} catch {}
		setStudentAuthed(false);
		setCurrentUser(null);
		toast.success("Signed out successfully.");
	}, []);
	const expireSession = (0, import_react.useCallback)(() => {
		try {
			localStorage.removeItem(AUTH_KEY);
			localStorage.removeItem(AUTH_USER_KEY);
			localStorage.removeItem(STUDENT_AUTH_KEY);
			localStorage.removeItem(STUDENT_USER_KEY);
			localStorage.removeItem(SESSION_TIMESTAMP_KEY);
		} catch {}
		setAuthed(false);
		setStudentAuthed(false);
		setCurrentUser(null);
		toast.error("Your session has expired. Please sign in again.");
	}, []);
	const addTimeline = (0, import_react.useCallback)((caseId, t) => {
		setCases((cs) => cs.map((c) => c.id === caseId ? touch(c, { timeline: [...c.timeline, {
			...t,
			id: uid(),
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}] }) : c));
	}, []);
	const addAuditLog = (0, import_react.useCallback)((caseId, entry) => {
		const actor = currentUser?.displayName || profile.name;
		setCases((cs) => cs.map((c) => c.id === caseId ? touch(c, { auditLog: [...c.auditLog || [], {
			...entry,
			id: uid(),
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			user: actor,
			actorId: currentUser?.id,
			actorRole: currentUser?.role
		}] }) : c));
	}, [currentUser, profile.name]);
	const pushNotification = (0, import_react.useCallback)((n) => {
		setNotifications((ns) => [{
			...n,
			id: uid(),
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			read: false
		}, ...ns]);
	}, []);
	const pushStudentNotification = (0, import_react.useCallback)((n) => {
		setStudentNotifications((ns) => [{
			...n,
			id: uid(),
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			read: false
		}, ...ns]);
	}, []);
	const addInvestigationNote = (0, import_react.useCallback)((caseId, content) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const author = currentUser?.displayName || profile.name;
		const newNote = {
			id: uid(),
			timestamp: ts,
			author,
			content
		};
		setCases((cs) => cs.map((c) => c.id === caseId ? touch(c, {
			investigationNotes: [newNote, ...c.investigationNotes || []],
			auditLog: [...c.auditLog || [], {
				id: uid(),
				timestamp: ts,
				event: "Note added",
				user: author,
				description: `Investigation note added: "${content.slice(0, 50)}${content.length > 50 ? "..." : ""}"`,
				category: "investigation",
				actorRole: currentUser?.role
			}],
			timeline: [...c.timeline, {
				id: uid(),
				timestamp: ts,
				event: "Investigator note recorded",
				kind: "note",
				description: content
			}]
		}) : c));
		return newNote;
	}, [currentUser, profile.name]);
	const updateInvestigationNote = (0, import_react.useCallback)((caseId, noteId, content) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const author = currentUser?.displayName || profile.name;
		setCases((cs) => cs.map((c) => c.id === caseId ? touch(c, {
			investigationNotes: (c.investigationNotes || []).map((n) => n.id === noteId ? {
				...n,
				content,
				updatedAt: ts
			} : n),
			auditLog: [...c.auditLog || [], {
				id: uid(),
				timestamp: ts,
				event: "Note edited",
				user: author,
				description: "Investigation note modified.",
				category: "investigation",
				actorRole: currentUser?.role
			}]
		}) : c));
	}, [currentUser, profile.name]);
	const deleteInvestigationNote = (0, import_react.useCallback)((caseId, noteId) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const author = currentUser?.displayName || profile.name;
		setCases((cs) => cs.map((c) => c.id === caseId ? touch(c, {
			investigationNotes: (c.investigationNotes || []).filter((n) => n.id !== noteId),
			auditLog: [...c.auditLog || [], {
				id: uid(),
				timestamp: ts,
				event: "Note deleted",
				user: author,
				description: "Investigation note removed.",
				category: "investigation",
				actorRole: currentUser?.role
			}]
		}) : c));
	}, [currentUser, profile.name]);
	const setTranscript = (0, import_react.useCallback)((caseId, entries, audioEvidenceId, status = "Completed") => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const author = currentUser?.displayName || profile.name;
		setCases((cs) => cs.map((c) => {
			if (c.id !== caseId) return c;
			const targetEvidence = audioEvidenceId ? c.evidence.find((e) => e.id === audioEvidenceId) : void 0;
			const evidenceRef = targetEvidence ? `Evidence #${String(targetEvidence.number).padStart(2, "0")}` : void 0;
			return touch(c, {
				transcript: entries,
				transcriptStatus: status,
				...audioEvidenceId ? { transcriptAudioEvidenceId: audioEvidenceId } : {},
				auditLog: [...c.auditLog || [], {
					id: uid(),
					timestamp: ts,
					event: "Transcript generated",
					user: author,
					description: `Hearing transcript with ${entries.length} statements generated${audioEvidenceId ? ` for audio evidence ${evidenceRef || audioEvidenceId}` : ""}.`,
					category: "investigation",
					actorRole: currentUser?.role
				}],
				timeline: [...c.timeline, {
					id: uid(),
					timestamp: ts,
					event: "Transcript generated",
					kind: "transcript",
					evidenceRef,
					description: `Automated speech-to-text transcript generated (${entries.length} spoken dialogue turns).`
				}]
			});
		}));
	}, [currentUser, profile.name]);
	const updateTranscriptEntry = (0, import_react.useCallback)((caseId, entryId, patch) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const author = currentUser?.displayName || profile.name;
		setCases((cs) => cs.map((c) => {
			if (c.id !== caseId || !c.transcript) return c;
			const updatedTranscript = c.transcript.map((item) => {
				if (item.id !== entryId) return item;
				return {
					...item,
					...patch,
					isEdited: true,
					originalText: item.originalText ?? item.text,
					reviewedBy: author,
					reviewedAt: ts
				};
			});
			return touch(c, {
				transcript: updatedTranscript,
				transcriptStatus: c.transcriptStatus === "Verified" ? "Verified" : "Needs Review",
				auditLog: [...c.auditLog || [], {
					id: uid(),
					timestamp: ts,
					event: "Transcript Reviewed/Updated",
					user: author,
					description: `Transcript statement (${entryId}) corrected/reviewed by committee.`,
					category: "investigation",
					actorRole: currentUser?.role
				}],
				timeline: [...c.timeline, {
					id: uid(),
					timestamp: ts,
					event: "Transcript reviewed",
					kind: "transcript",
					description: `Committee review and dialogue corrections logged by ${author}.`
				}]
			});
		}));
	}, [currentUser, profile.name]);
	const verifyTranscript = (0, import_react.useCallback)((caseId) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const verifier = currentUser?.displayName || profile.name;
		setCases((cs) => cs.map((c) => {
			if (c.id !== caseId) return c;
			const verifiedEntries = (c.transcript || []).map((t) => ({
				...t,
				reviewed: true,
				reviewedBy: t.reviewedBy || verifier,
				reviewedAt: t.reviewedAt || ts
			}));
			return touch(c, {
				transcript: verifiedEntries,
				transcriptStatus: "Verified",
				auditLog: [...c.auditLog || [], {
					id: uid(),
					timestamp: ts,
					event: "Transcript Verified",
					user: verifier,
					description: "Voice-to-text transcript officially verified by Discipline Committee.",
					category: "investigation",
					actorRole: currentUser?.role
				}],
				timeline: [...c.timeline, {
					id: uid(),
					timestamp: ts,
					event: "Transcript verified",
					kind: "transcript",
					description: `Transcript verified by ${verifier}. Evidentiary record approved.`
				}]
			});
		}));
		toast.success("Transcript officially marked as Reviewed & Verified.");
	}, [currentUser, profile.name]);
	const setTranscriptStatus = (0, import_react.useCallback)((caseId, status, evidenceId) => {
		setCases((cs) => cs.map((c) => c.id === caseId ? touch(c, {
			transcriptStatus: status,
			...evidenceId ? { transcriptAudioEvidenceId: evidenceId } : {}
		}) : c));
	}, []);
	const closeCase = (0, import_react.useCallback)((caseId, closure) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const actor = currentUser?.displayName || profile.name;
		const fullClosure = {
			...closure,
			closedAt: ts,
			closedBy: actor
		};
		setCases((cs) => cs.map((c) => {
			if (c.id !== caseId) return c;
			const audit = {
				id: uid(),
				timestamp: ts,
				event: "Case closed",
				user: actor,
				description: `Case officially marked Closed with outcome: ${closure.outcome}. Final decision: ${closure.finalDecision}. Remarks: ${closure.finalRemarks}`,
				category: "closure",
				actorRole: currentUser?.role
			};
			const tl = {
				id: uid(),
				timestamp: ts,
				event: `Case Closed: ${closure.finalDecision}`,
				description: closure.outcome,
				kind: "closed"
			};
			return touch(c, {
				status: "Closed",
				closureInfo: fullClosure,
				auditLog: [...c.auditLog || [], audit],
				timeline: [...c.timeline, tl]
			});
		}));
		const cRecord = cases.find((c) => c.id === caseId);
		if (cRecord?.sourceComplaintId) setComplaints((cmps) => cmps.map((cmp) => {
			if (cmp.id !== cRecord.sourceComplaintId) return cmp;
			return touchComplaint(cmp, {
				status: "Closed",
				authorizedUpdates: [...cmp.authorizedUpdates || [], `Case ${caseId} inquiry has concluded. Official finding: ${closure.outcome}.`]
			});
		}));
		pushNotification({
			type: "closure",
			message: `Case ${caseId} has been closed by ${actor}. Outcome: ${closure.outcome}`,
			caseId
		});
	}, [
		cases,
		currentUser,
		profile.name,
		pushNotification
	]);
	const changeCaseStatus = (0, import_react.useCallback)((caseId, newStatus, reason) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const actor = currentUser?.displayName || profile.name;
		setCases((cs) => cs.map((c) => {
			if (c.id !== caseId) return c;
			return touch(c, {
				status: newStatus,
				auditLog: [...c.auditLog || [], {
					id: uid(),
					timestamp: ts,
					event: `Status changed to ${newStatus}`,
					user: actor,
					description: reason || `Case status updated from ${c.status} to ${newStatus}.`,
					category: "case",
					actorRole: currentUser?.role
				}],
				timeline: [...c.timeline, {
					id: uid(),
					timestamp: ts,
					event: `Status changed to ${newStatus}`,
					kind: "decision",
					...reason ? { description: reason } : {}
				}]
			});
		}));
	}, [currentUser, profile.name]);
	const verifySynopsis = (0, import_react.useCallback)((caseId) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const verifier = currentUser?.displayName || profile.name;
		setCases((cs) => cs.map((c) => {
			if (c.id !== caseId) return c;
			const aiSynopsis = {
				status: "Reviewed by Committee",
				content: c.synopsis || "AI synopsis verified by the committee.",
				generatedAt: c.aiSynopsis?.generatedAt || ts,
				reviewed: true,
				verifiedBy: verifier,
				verifiedAt: ts
			};
			return touch(c, {
				aiSynopsis,
				auditLog: [...c.auditLog || [], {
					id: uid(),
					timestamp: ts,
					event: "Synopsis Verified",
					user: verifier,
					description: "AI-assisted synopsis reviewed and officially verified by committee.",
					category: "synopsis",
					actorRole: currentUser?.role
				}],
				timeline: [...c.timeline, {
					id: uid(),
					timestamp: ts,
					event: "Investigation Synopsis Verified",
					kind: "synopsis",
					description: `Verified by ${verifier}`
				}]
			});
		}));
		pushNotification({
			type: "synopsis",
			message: `Investigation synopsis for case ${caseId} was reviewed and verified by ${verifier}.`,
			caseId
		});
		toast.success("AI Synopsis marked as Reviewed & Verified.");
	}, [
		currentUser,
		profile.name,
		pushNotification
	]);
	const assignBoardMember = (0, import_react.useCallback)((caseId, memberEmail, memberName) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const actor = currentUser?.displayName || profile.name;
		setCases((cs) => cs.map((c) => {
			if (c.id !== caseId) return c;
			return touch(c, {
				assignedBoardMember: memberName,
				assignedBoardMemberEmail: memberEmail,
				assignedBy: actor,
				assignedAt: ts,
				auditLog: [...c.auditLog || [], {
					id: uid(),
					timestamp: ts,
					event: "Board Member Assigned",
					user: actor,
					description: `Case formally assigned to Disciplinary Board Member (${memberEmail}) by ${actor}.`,
					category: "case",
					actorRole: currentUser?.role
				}],
				timeline: [...c.timeline, {
					id: uid(),
					timestamp: ts,
					event: "Board Member Assigned",
					kind: "note",
					description: `Assigned to Disciplinary Board Member (${memberEmail}) for hearing & findings.`
				}]
			});
		}));
		pushNotification({
			type: "investigation",
			title: "New Case Assignment",
			message: `You have been assigned to review and vote on Case ${caseId}.`,
			caseId,
			recipientRole: "Disciplinary Board Member",
			recipientId: "usr_board_003"
		});
		toast.success(`Case successfully assigned to Disciplinary Board Member.`);
	}, [
		currentUser,
		profile.name,
		pushNotification
	]);
	const submitBoardVote = (0, import_react.useCallback)((caseId, vote, remarks) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const voter = currentUser?.displayName || "Disciplinary Board Member";
		const voterEmail = currentUser?.email || "committee.member@kprcas.ac.in";
		const newVote = {
			id: uid(),
			voter,
			voterEmail,
			role: "Disciplinary Board Member",
			vote,
			timestamp: ts,
			remarks
		};
		setCases((cs) => cs.map((c) => {
			if (c.id !== caseId) return c;
			const filtered = (c.boardVotes || []).filter((v) => v.voterEmail !== voterEmail);
			return touch(c, {
				boardVotes: [...filtered, newVote],
				auditLog: [...c.auditLog || [], {
					id: uid(),
					timestamp: ts,
					event: `Board Vote: ${vote}`,
					user: voter,
					description: `Disciplinary Board Member submitted vote: ${vote}. Remarks: ${remarks || "None"}`,
					category: "decision",
					actorRole: currentUser?.role
				}],
				timeline: [...c.timeline, {
					id: uid(),
					timestamp: ts,
					event: `Board Member Vote (${vote})`,
					kind: "decision",
					description: `Vote recorded: ${vote}.${remarks ? ` Remarks: ${remarks}` : ""}`
				}]
			});
		}));
		pushNotification({
			type: "decision",
			title: "Board Member Vote Submitted",
			message: `Disciplinary Board Member has voted (${vote}) on Case ${caseId}.`,
			caseId,
			recipientRole: "Committee Head"
		});
		toast.success(`Vote "${vote}" recorded successfully.`);
	}, [currentUser, pushNotification]);
	const addEvidence = (0, import_react.useCallback)((caseId, e) => {
		const id = uid();
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const actor = currentUser?.displayName || profile.name;
		const initialCustody = e.custodyHistory || [{
			id: uid(),
			timestamp: ts,
			action: "Captured",
			performedBy: e.capturedBy || actor,
			details: e.type === "audio" ? "Investigation audio recorded via browser studio" : "Initial evidence intake on site"
		}, {
			id: uid(),
			timestamp: ts,
			action: "Added to Case",
			performedBy: actor,
			details: `Attached to case file ${caseId}`
		}];
		let createdEv = {
			...e,
			id,
			caseId,
			number: 1,
			timestamp: ts,
			status: e.status || (e.type === "audio" ? "Pending Review" : "Verified"),
			transcriptStatus: e.transcriptStatus || (e.type === "audio" ? "Not Generated" : void 0),
			mimeType: e.mimeType || (e.type === "audio" ? "audio/webm" : void 0),
			recordedAt: e.recordedAt || ts,
			recordedBy: e.recordedBy || e.capturedBy || actor,
			custodyHistory: initialCustody
		};
		setCases((cs) => cs.map((c) => {
			if (c.id !== caseId) return c;
			const nextNumber = (c.evidence?.length || 0) + 1;
			createdEv = {
				...createdEv,
				number: nextNumber
			};
			return touch(c, {
				evidence: [...c.evidence || [], createdEv],
				auditLog: [...c.auditLog || [], {
					id: uid(),
					timestamp: ts,
					event: e.type === "audio" ? "Audio evidence saved" : "Evidence added",
					user: actor,
					description: `Evidence #${String(nextNumber).padStart(2, "0")} (${createdEv.fileName}) added to case record.`,
					category: "evidence",
					actorRole: currentUser?.role
				}],
				timeline: [...c.timeline, {
					id: uid(),
					timestamp: ts,
					event: e.type === "audio" ? "Audio evidence saved" : `Evidence attached: ${createdEv.fileName}`,
					kind: createdEv.type === "photo" ? "photo" : createdEv.type === "video" ? "video" : "audio",
					evidenceRef: `Evidence #${String(nextNumber).padStart(2, "0")}`,
					description: createdEv.description
				}]
			});
		}));
		pushNotification({
			type: "evidence",
			message: `New evidence "${createdEv.fileName}" attached to Case ${caseId}.`,
			caseId
		});
		return createdEv;
	}, [
		currentUser,
		profile.name,
		pushNotification
	]);
	const updateEvidence = (0, import_react.useCallback)((caseId, evId, patch, custodyAction) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const actor = currentUser?.displayName || profile.name;
		setCases((cs) => cs.map((c) => {
			if (c.id !== caseId) return c;
			const newEvidence = c.evidence.map((ev) => {
				if (ev.id !== evId) return ev;
				const custodyEntry = custodyAction ? {
					id: uid(),
					timestamp: ts,
					action: custodyAction,
					performedBy: actor,
					...patch.description ? { details: "Description updated" } : {}
				} : void 0;
				return {
					...ev,
					...patch,
					...custodyEntry ? { custodyHistory: [...ev.custodyHistory || [], custodyEntry] } : ev.custodyHistory !== void 0 ? { custodyHistory: ev.custodyHistory } : {}
				};
			});
			return touch(c, {
				evidence: newEvidence,
				auditLog: [...c.auditLog || [], {
					id: uid(),
					timestamp: ts,
					event: "Evidence modified",
					user: actor,
					description: custodyAction || `Evidence record updated.`,
					category: "evidence",
					actorRole: currentUser?.role
				}]
			});
		}));
	}, [currentUser, profile.name]);
	const addComplaint = (0, import_react.useCallback)((data) => {
		const maxNum = Math.max(0, ...complaints.map((c) => parseInt(c.id.replace("CMP-", "") || "0", 10)));
		const id = `CMP-${String(maxNum + 1).padStart(3, "0")}`;
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const newComplaint = {
			...data,
			id,
			submittedAt: ts,
			updatedAt: ts,
			status: "Submitted",
			timeline: [{
				id: uid(),
				timestamp: ts,
				event: "Complaint Submitted",
				description: `Official grievance registered by student (${data.privacyPreference} mode). Institutional officers notified.`
			}]
		};
		setComplaints((prev) => [newComplaint, ...prev]);
		const { newNotifications } = notificationService.handleComplaintSubmitted(newComplaint, notifications);
		if (newNotifications.length > 0) setNotifications((prev) => [...newNotifications, ...prev]);
		pushStudentNotification({
			title: "Complaint Received",
			message: `Your complaint ${id} has been submitted and queued for confidential review. Authorized institutional personnel have been notified.`,
			complaintId: id
		});
		return newComplaint;
	}, [
		complaints,
		notifications,
		pushStudentNotification
	]);
	const updateComplaint = (0, import_react.useCallback)((id, patch) => {
		setComplaints((cs) => cs.map((c) => c.id === id ? touchComplaint(c, patch) : c));
	}, []);
	const acceptComplaint = (0, import_react.useCallback)((id) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const reviewer = currentUser?.displayName || profile.name;
		setComplaints((cs) => cs.map((c) => {
			if (c.id !== id) return c;
			const updates = [...c.authorizedUpdates || [], "Complaint has been reviewed and accepted by the Discipline Committee. Active inquiry scheduled."];
			const timeline = [...c.timeline, {
				id: uid(),
				timestamp: ts,
				event: "Complaint Accepted for Investigation",
				description: `Reviewed and accepted by ${reviewer}.`
			}];
			return touchComplaint(c, {
				status: "Accepted",
				authorizedUpdates: updates,
				timeline
			});
		}));
		pushStudentNotification({
			title: "Complaint Accepted for Review",
			message: `Your complaint ${id} has been accepted. A formal inquiry will proceed.`,
			complaintId: id
		});
		toast.success(`Complaint ${id} accepted for formal processing.`);
	}, [
		currentUser,
		profile.name,
		pushStudentNotification
	]);
	const rejectComplaint = (0, import_react.useCallback)((id, reason, remarks) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const reviewer = currentUser?.displayName || profile.name;
		const role = currentUser?.role || "Committee Head";
		setComplaints((cs) => cs.map((c) => {
			if (c.id !== id) return c;
			const updates = [...c.authorizedUpdates || [], `Complaint closed after preliminary review: ${reason}.${remarks ? ` ${remarks}` : ""}`];
			const timeline = [...c.timeline, {
				id: uid(),
				timestamp: ts,
				event: "Complaint Rejected / Closed",
				description: `Reason: ${reason}. Reviewed by ${role}.`
			}];
			return touchComplaint(c, {
				status: "Rejected",
				rejectionReason: reason,
				...remarks ? { rejectionRemarks: remarks } : {},
				rejectedBy: reviewer,
				rejectedAt: ts,
				reviewerRole: role,
				authorizedUpdates: updates,
				timeline
			});
		}));
		pushStudentNotification({
			title: "Your complaint has been reviewed",
			message: `Complaint ${id} was reviewed by the committee and closed: ${reason}.`,
			complaintId: id
		});
		pushNotification({
			type: "closure",
			message: `Complaint ${id} rejected by ${reviewer}: ${reason}`,
			complaintId: id
		});
		toast.info(`Complaint ${id} rejected: ${reason}`);
	}, [
		currentUser,
		profile.name,
		pushNotification,
		pushStudentNotification
	]);
	const requestComplaintInfo = (0, import_react.useCallback)((id, question, requestType) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const reviewer = currentUser?.displayName || profile.name;
		const req = {
			id: uid(),
			complaintId: id,
			requestedAt: ts,
			requestedBy: reviewer,
			requestType: requestType || "Clarification",
			question,
			requestText: question,
			status: "Requested"
		};
		setComplaints((cs) => cs.map((c) => {
			if (c.id !== id) return c;
			const infoRequests = [...c.infoRequests || [], req];
			const updates = [...c.authorizedUpdates || [], `The Discipline Committee has requested additional information (${requestType || "Clarification"}) to assist the review.`];
			const timeline = [...c.timeline, {
				id: uid(),
				timestamp: ts,
				event: "Additional Information Requested",
				description: `Inquiry (${requestType || "Clarification"}): "${question}"`
			}];
			return touchComplaint(c, {
				status: "Additional Information Requested",
				infoRequests,
				authorizedUpdates: updates,
				timeline
			});
		}));
		pushStudentNotification({
			title: "Action Required: Additional Info Requested",
			message: `The Committee requires further details for complaint ${id}: "${question}"`,
			complaintId: id
		});
		toast.success("Additional information request dispatched to student.");
	}, [
		currentUser,
		profile.name,
		pushStudentNotification
	]);
	const respondComplaintInfo = (0, import_react.useCallback)((id, requestId, response, responseEvidence) => {
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		setComplaints((cs) => cs.map((c) => {
			if (c.id !== id) return c;
			const newReqs = (c.infoRequests || []).map((req) => req.id === requestId ? {
				...req,
				response,
				respondedAt: ts,
				status: "Responded",
				...responseEvidence ? { responseEvidence } : {}
			} : req);
			const newEvidence = responseEvidence ? [...c.evidence, ...responseEvidence] : c.evidence;
			const updates = [...c.authorizedUpdates || [], "Additional information provided by student has been received."];
			const timeline = [...c.timeline, {
				id: uid(),
				timestamp: ts,
				event: "Student Provided Information",
				description: response
			}];
			return touchComplaint(c, {
				status: "Under Review",
				infoRequests: newReqs,
				evidence: newEvidence,
				authorizedUpdates: updates,
				timeline
			});
		}));
		pushNotification({
			type: "complaint",
			message: `Student provided additional details on complaint ${id}.`,
			complaintId: id
		});
		toast.success("Response submitted successfully.");
	}, [pushNotification]);
	const convertComplaintToCase = (0, import_react.useCallback)((complaintId, reason) => {
		const complaint = complaints.find((c) => c.id === complaintId);
		if (!complaint) return void 0;
		const maxNum = Math.max(0, ...cases.map((c) => parseInt(c.id.replace("DSIM-", "") || "0", 10)));
		const newCaseId = `DSIM-${String(maxNum + 1).padStart(3, "0")}`;
		const ts = (/* @__PURE__ */ new Date()).toISOString();
		const converter = currentUser?.displayName || profile.name;
		const primaryPerson = complaint.personsInvolved.find((p) => p.isPrimary) || complaint.personsInvolved[0];
		const otherPersons = complaint.personsInvolved.filter((p) => p !== primaryPerson);
		const convertedEvidence = complaint.evidence.map((ce, idx) => ({
			id: uid(),
			number: idx + 1,
			caseId: newCaseId,
			type: ce.fileType.startsWith("image/") ? "photo" : ce.fileType.startsWith("video/") ? "video" : ce.fileType.startsWith("audio/") ? "audio" : "document",
			fileName: ce.fileName,
			fileSize: ce.fileSize,
			timestamp: ce.uploadedAt || ts,
			capturedBy: complaint.studentName,
			description: ce.description || `Submitted with complaint ${complaint.id}`,
			...ce.url ? { url: ce.url } : {},
			status: "Verified",
			custodyHistory: [{
				id: uid(),
				timestamp: ts,
				action: "Transferred from Complaint",
				performedBy: converter,
				details: `Imported directly from student complaint ${complaint.id}`
			}]
		}));
		const newCase = {
			id: newCaseId,
			caseName: complaint.title,
			description: `${complaint.description}\n\n[Location: ${complaint.location}] | [Incident Date: ${complaint.incidentDate}${complaint.incidentTime ? ` at ${complaint.incidentTime}` : ""}]\n[Confidentiality Preference: ${complaint.privacyPreference}]`,
			accusedStudent: primaryPerson?.name || "Person Reported",
			rollNumber: primaryPerson?.rollNumber || "N/A",
			department: primaryPerson?.department || complaint.studentDepartment,
			academicYear: complaint.academicYear,
			yearOfStudy: complaint.yearOfStudy,
			status: "Under Investigation",
			sourceComplaintId: complaint.id,
			involvedPersons: [
				...primaryPerson ? [{
					id: uid(),
					name: primaryPerson.name,
					role: "Person Reported",
					department: primaryPerson.department || complaint.studentDepartment,
					...primaryPerson.rollNumber ? { rollNumber: primaryPerson.rollNumber } : {}
				}] : [],
				...otherPersons.map((op) => ({
					id: uid(),
					name: op.name,
					role: "Person Involved",
					department: op.department || "Unknown",
					...op.rollNumber ? { rollNumber: op.rollNumber } : {}
				})),
				...complaint.witnesses.map((w) => ({
					id: uid(),
					name: w.name,
					role: "Witness",
					department: w.department || "Unknown",
					...w.rollNumber ? { rollNumber: w.rollNumber } : {}
				}))
			],
			evidence: convertedEvidence,
			investigationNotes: [{
				id: uid(),
				timestamp: ts,
				author: converter,
				content: `Case initialized from Student Complaint ${complaint.id} submitted by ${complaint.privacyPreference === "anonymous_to_reported" ? "Student (Protected Identity)" : complaint.studentName}. Initial urgency assessed as ${complaint.urgency.toUpperCase()}.${reason ? ` Conversion remarks: ${reason}` : ""}`
			}],
			auditLog: [{
				id: uid(),
				timestamp: ts,
				event: "Case converted from complaint",
				user: converter,
				description: `Disciplinary case created from Complaint ${complaint.id}. Originating student: ${complaint.studentRoll}`,
				category: "case",
				actorRole: currentUser?.role,
				entityType: "complaint",
				entityId: complaint.id
			}],
			timeline: [{
				id: uid(),
				timestamp: ts,
				event: `Case initialized from ${complaint.id}`,
				kind: "created",
				description: `Converted by ${converter}`
			}, {
				id: uid(),
				timestamp: ts,
				event: "Formal investigation initiated",
				kind: "start"
			}],
			createdAt: ts,
			updatedAt: ts
		};
		setCases((cs) => [newCase, ...cs]);
		setComplaints((cs) => cs.map((c) => {
			if (c.id !== complaintId) return c;
			const updates = [...c.authorizedUpdates || [], `Complaint accepted and converted into formal inquiry case ${newCaseId}. Investigation in progress.`];
			const timeline = [...c.timeline, {
				id: uid(),
				timestamp: ts,
				event: "Complaint converted to Case",
				description: `Formal case ${newCaseId} initialized for disciplinary proceedings.`
			}];
			return touchComplaint(c, {
				status: "Converted to Case",
				convertedCaseId: newCaseId,
				sourceCaseId: newCaseId,
				convertedAt: ts,
				convertedBy: converter,
				authorizedUpdates: updates,
				timeline
			});
		}));
		pushStudentNotification({
			title: "Complaint Converted to Formal Case",
			message: `Your complaint ${complaintId} has been converted into formal inquiry case ${newCaseId}.`,
			complaintId
		});
		pushNotification({
			type: "investigation",
			message: `Complaint ${complaintId} converted into Case ${newCaseId}. Investigation ready.`,
			caseId: newCaseId
		});
		toast.success(`Complaint ${complaintId} converted to Case ${newCaseId}`);
		return newCase;
	}, [
		cases,
		complaints,
		currentUser,
		profile.name,
		pushNotification,
		pushStudentNotification
	]);
	const getStudentComplaints = (0, import_react.useCallback)((studentIdOrRoll) => {
		const target = studentIdOrRoll || currentUser?.studentId || studentProfile.rollNumber;
		return complaints.filter((c) => c.studentId === target || c.studentRoll === target || currentUser?.email && c.studentEmail === currentUser.email);
	}, [
		complaints,
		currentUser,
		studentProfile.rollNumber
	]);
	const value = (0, import_react.useMemo)(() => ({
		ready,
		currentUser,
		userRole: currentUser?.role || null,
		isAuthenticated: authed || studentAuthed,
		hasPermission: hasPermission$1,
		authed,
		login,
		logout,
		expireSession,
		studentAuthed,
		studentLogin,
		studentLogout,
		studentProfile,
		setStudentProfile,
		updateStudentProfile: (patch) => setStudentProfile((p) => ({
			...p,
			...patch
		})),
		studentNotifications,
		pushStudentNotification,
		markStudentNotificationRead: (id) => setStudentNotifications((ns) => ns.map((n) => n.id === id ? {
			...n,
			read: true
		} : n)),
		markAllStudentNotificationsRead: () => setStudentNotifications((ns) => ns.map((n) => ({
			...n,
			read: true
		}))),
		cases,
		getCase: (id) => cases.find((c) => c.id === id),
		addCase: (c) => {
			const id = `DSIM-${String(cases.length + 1).padStart(3, "0")}`;
			const ts = (/* @__PURE__ */ new Date()).toISOString();
			const actor = currentUser?.displayName || profile.name;
			const newCase = {
				...c,
				id,
				timeline: [{
					id: uid(),
					timestamp: ts,
					event: "Case Created",
					kind: "created",
					description: `Case initiated by ${actor}`
				}],
				evidence: [],
				auditLog: [{
					id: uid(),
					timestamp: ts,
					event: "Case created",
					user: actor,
					description: `Initial case created: ${c.caseName}`,
					category: "case",
					actorRole: currentUser?.role
				}],
				createdAt: ts,
				updatedAt: ts
			};
			setCases((prev) => [newCase, ...prev]);
			return newCase;
		},
		updateCase: (id, patch) => setCases((cs) => cs.map((c) => c.id === id ? touch(c, patch) : c)),
		deleteCase: (id) => setCases((cs) => cs.filter((c) => c.id !== id)),
		closeCase,
		changeCaseStatus,
		verifySynopsis,
		assignBoardMember,
		submitBoardVote,
		addEvidence,
		updateEvidence,
		removeEvidence: (caseId, evId) => {
			const ts = (/* @__PURE__ */ new Date()).toISOString();
			const actor = currentUser?.displayName || profile.name;
			setCases((cs) => cs.map((x) => {
				if (x.id !== caseId) return x;
				const target = x.evidence.find((e) => e.id === evId);
				return touch(x, {
					evidence: x.evidence.filter((e) => e.id !== evId),
					auditLog: [...x.auditLog || [], {
						id: uid(),
						timestamp: ts,
						event: "Evidence deleted",
						user: actor,
						description: `Evidence ${target ? `#${String(target.number).padStart(2, "0")} (${target.fileName})` : evId} removed.`,
						category: "evidence",
						actorRole: currentUser?.role
					}]
				});
			}));
		},
		addTimeline,
		addAuditLog,
		addInvestigationNote,
		updateInvestigationNote,
		deleteInvestigationNote,
		setTranscript,
		updateTranscriptEntry,
		verifyTranscript,
		setTranscriptStatus,
		complaints,
		getComplaint: (id) => complaints.find((c) => c.id === id),
		getStudentComplaints,
		addComplaint,
		updateComplaint,
		acceptComplaint,
		rejectComplaint,
		requestComplaintInfo,
		respondComplaintInfo,
		convertComplaintToCase,
		notifications,
		pushNotification,
		markRead: (id) => {
			const ts = (/* @__PURE__ */ new Date()).toISOString();
			setNotifications((ns) => ns.map((n) => n.id === id ? {
				...n,
				read: true,
				readAt: ts,
				deliveryStatus: "Read"
			} : n));
		},
		markAllRead: () => {
			const ts = (/* @__PURE__ */ new Date()).toISOString();
			setNotifications((ns) => ns.map((n) => {
				if (!currentUser || !n.recipientRole || n.recipientRole === currentUser.role || n.recipientId === currentUser.id) return {
					...n,
					read: true,
					readAt: ts,
					deliveryStatus: "Read"
				};
				return n;
			}));
		},
		profile,
		setProfile,
		settings,
		setSetting: (k, v) => setSettings((s) => ({
			...s,
			[k]: v
		}))
	}), [
		ready,
		currentUser,
		hasPermission$1,
		authed,
		login,
		logout,
		studentAuthed,
		studentLogin,
		studentLogout,
		studentProfile,
		studentNotifications,
		pushStudentNotification,
		cases,
		closeCase,
		changeCaseStatus,
		verifySynopsis,
		assignBoardMember,
		submitBoardVote,
		addEvidence,
		updateEvidence,
		addTimeline,
		addAuditLog,
		addInvestigationNote,
		updateInvestigationNote,
		deleteInvestigationNote,
		setTranscript,
		updateTranscriptEntry,
		verifyTranscript,
		setTranscriptStatus,
		complaints,
		getStudentComplaints,
		addComplaint,
		updateComplaint,
		acceptComplaint,
		rejectComplaint,
		requestComplaintInfo,
		respondComplaintInfo,
		convertComplaintToCase,
		notifications,
		pushNotification,
		profile,
		settings
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useDsim() {
	const s = (0, import_react.useContext)(Ctx);
	if (!s) throw new Error("useDsim must be used within DsimProvider");
	return s;
}
var evLabel = (n) => `Evidence #${String(n).padStart(2, "0")}`;
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { useDsim as _, INSTITUTION as a, YEARS_OF_STUDY as c, evLabel as d, isCommitteeUser as f, kprcasSchools as g, kprcasComplaintLocations as h, DsimProvider as i, buttonVariants as l, kprcasComplaintCategories as m, Button as n, MOCK_ACCOUNTS as o, isStudent as p, DEPARTMENTS as r, SAMPLE_SYNOPSIS as s, ACADEMIC_YEARS as t, cn as u };
