/** biome-ignore-all assist/source/useSortedKeys: for readability */
import type { BaseTranslation } from "../i18n-types.js";

const ar = {
  login: {
    loginButton: "تسجيل الدخول باستخدام Discord",
    description: "تطبيق ويب لإدارة خادم الألعاب. العب ألعاب WebGL مباشرة في متصفحك",
  },
  sidebar: {
    content: {
      items: "العناصر",
      playground: "ملعب",
      servers: "الخوادم",
    },
    userNavigation: {
      logOut: "تسجيل الخروج",
      theme: {
        toggleTheme: "تبديل المظهر",
        dark: "مظلم",
        light: "فاتح",
      },
    },
  },
  top: {
    title: "الخوادم",
    tile: {
      unitySportsResortCard: {
        play: "تشغيل",
        author: "المؤلف: ",
      },
    },
    table: {
      customizeColumns: {
        long: "تخصيص الأعمدة",
        short: "الأعمدة",
      },
      column: {
        composeName: "اسم التكوين",
        project: "المشروع",
        environment: "البيئة",
        status: "الحالة",
        type: "النوع",
        description: "الوصف",
      },
      serverActionDropdown: {
        start: {
          start: "بدء",
          error: "❌ فشل بدء الخادم. يرجى المحاولة مرة أخرى.",
          loading: "🚀 جاري تشغيل الخادم...",
          success: "✨ تم تشغيل الخادم بنجاح!",
        },
        stop: {
          stop: "إيقاف",
          error: "❌ فشل إيقاف الخادم. يرجى المحاولة مرة أخرى.",
          loading: "⏹️ جاري إيقاف الخادم...",
          success: "✅ تم إيقاف الخادم بنجاح",
        },
        redeploy: {
          reDeploy: "إعادة النشر",
          error: "❌ فشل إعادة نشر الخادم. يرجى المحاولة مرة أخرى.",
          loading: "🔄 جاري إعادة نشر الخادم...",
          success: "🎉 تم إعادة نشر الخادم بنجاح!",
        },
      },
      pagination: {
        rowsSelected: "{selected} من {total} الصفوف المحددة",
        pageInfo: "الصفحة {current} من {total}",
      },
    },
  },
  unitySportsResortCard: {
    play: "تشغيل",
  },
} satisfies BaseTranslation;

export default ar;
