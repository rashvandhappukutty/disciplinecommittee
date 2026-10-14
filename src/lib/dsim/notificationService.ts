import type {
  AppNotification,
  ComplaintRecord,
  NotificationPriority,
  NotificationDeliveryStatus,
  UserRole,
  AuditLogEntry,
} from "./types";

export interface FutureEmailDispatch {
  id: string;
  recipientEmail: string;
  recipientRole: string;
  subject: string;
  template: "NEW_COMPLAINT_SUBMITTED_ALERT";
  payload: {
    complaintId: string;
    category: string;
    submittedAt: string;
    urgency: string;
    actionUrl: string;
  };
  queuedAt: string;
  status: "Queued" | "Sent" | "Failed";
}

export interface ComplaintSubmittedEvent {
  eventType: "COMPLAINT_SUBMITTED";
  complaintId: string;
  submittedAt: string;
  category: string;
  urgency: string;
  privacyLevel: string;
}

export interface NotificationDispatchResult {
  newNotifications: AppNotification[];
  auditEntry: AuditLogEntry;
  emailDispatches: FutureEmailDispatch[];
}

/**
 * Institutional Notification Service
 * Dispatches event-driven notifications to Principal, Administrative Officer, and Committee Head
 * when a new student complaint is submitted.
 */
export const notificationService = {
  /**
   * Handle the COMPLAINT_SUBMITTED institutional event
   */
  handleComplaintSubmitted(
    complaint: ComplaintRecord,
    existingNotifications: AppNotification[] = [],
  ): NotificationDispatchResult {
    const ts = new Date().toISOString();

    // Map complaint urgency to notification priority
    let priority: NotificationPriority = "NORMAL";
    if (complaint.urgency === "immediate_safety") {
      priority = "URGENT";
    } else if (complaint.urgency === "urgent") {
      priority = "HIGH";
    }

    const actionUrl = `/complaints/${complaint.id}`;

    // Define the 3 institutional recipients with role-based permissions
    const recipientConfigs: {
      recipientId: string;
      recipientRole: UserRole;
      title: string;
      message: string;
      email: string;
    }[] = [
      {
        recipientId: "usr_principal_000",
        recipientRole: "Principal",
        title: "New Student Complaint Submitted",
        message: `A new student complaint (${complaint.id}) in ${complaint.category} has been submitted and is awaiting institutional review.`,
        email: "principal@kprcas.ac.in",
      },
      {
        recipientId: "usr_ao_001",
        recipientRole: "Administrative Officer",
        title: "New Student Complaint Submitted",
        message: `A new student complaint (${complaint.id}) in ${complaint.category} has been submitted and is awaiting institutional review.`,
        email: "ao@kprcas.ac.in",
      },
      {
        recipientId: "usr_head_001",
        recipientRole: "Committee Head",
        title: "New Complaint Requires Review",
        message: `A new student complaint (${complaint.id}) in ${complaint.category} requires initial committee triage and review.`,
        email: "discipline.head@kprcas.ac.in",
      },
    ];

    const newNotifications: AppNotification[] = [];
    const emailDispatches: FutureEmailDispatch[] = [];

    recipientConfigs.forEach((rec) => {
      const notificationKey = `NEW_COMPLAINT_SUBMITTED:${complaint.id}:${rec.recipientRole}`;

      // Duplicate prevention: check if this key already exists
      const alreadyExists = existingNotifications.some(
        (n) => n.notificationKey === notificationKey,
      );

      if (!alreadyExists) {
        const notif: AppNotification = {
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
          readAt: undefined,
        };
        newNotifications.push(notif);

        // Architecture for future email notifications
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
            actionUrl,
          },
          queuedAt: ts,
          status: "Queued",
        });
      }
    });

    const auditEntry: AuditLogEntry = {
      id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: ts,
      event: "Institutional Notifications Dispatched",
      user: "System Event Dispatcher",
      description: `New complaint notifications generated for authorized institutional recipients (Principal, AO, Committee Head) for ${complaint.id}.`,
      category: "complaint",
      actorRole: "System",
      action: "NOTIFY_INSTITUTIONAL_OFFICERS",
      entityType: "Complaint",
      entityId: complaint.id,
    };

    return {
      newNotifications,
      auditEntry,
      emailDispatches,
    };
  },
};
