import { AgentData, Agent, Team } from "@/types/agent";

// 从用户提供的JSON数据中提取的角色数据
export const agentData: AgentData = {
  solo: [
    {
      name: "Lumi",
      code: "web_generator",
      category: "个人",
      level: "高级",
      industry: "办公与生产力",
      title: "网站应用开发",
      data_source: "空",
      mbti: "ENFP",
      tools: "Web_Search(网络搜索)",
      skills: "网页结构设计, 响应式布局, 内容自动填充, 交互模块生成, 多模态素材整合",
      description: "无论是产品展示页、个人博客，还是互动式页面，我都能够快速生成结构清晰、响应流畅且设计美观的网页。",
      welcome: "我一直相信，每个伟大的想法都值得被看见。💖  \n你好，我是Lumi，你的创意可视化伙伴。🤝 把你的灵感交给我，我们一起让它惊艳世界！🚀  \n告诉我你的想法，比如：  \n- \"把我的旅行经历，做成一个图文并茂的网页故事\" 🎨  \n- \"我写了一首诗，想为它设计一个展示页\" ✍️  \n- \"一个简约风格的个人简历网页\" 📄",
      background: "我热衷于将创意转化为精美的网站，以信息可视化的方式进行表达，助力您在网络世界中光彩夺目。",
      top_card: "https://static.goagent.store/static/Lumi/TOP%20%E5%8D%A1%E7%89%87.webp",
      top_avatar: "https://static.goagent.store/static/Lumi/TOP%20%E5%A4%B4%E5%83%8F.webp",
      card: "https://static.goagent.store/static/Lumi/lumi_role_list.png",
      avatar: "https://static.goagent.store/static/Lumi/%E5%A4%B4%E5%83%8F.webp",
      pop_up_card: "https://static.goagent.store/static/Lumi/lumi_detail.png",
      popularity: 865,
      radarData: [
        { name: "工具使用", score: 83 },
        { name: "理解能力", score: 88 },
        { name: "知识储备", score: 62 },
        { name: "稳定性", score: 77 },
        { name: "专业性", score: 94 }
      ]
    },
    {
      name: "Lina",
      code: "report_generator",
      category: "个人",
      level: "高级",
      industry: "办公与生产力",
      title: "Word专家",
      data_source: "空",
      mbti: "INTJ",
      tools: "Web_Search(网络搜索)",
      skills: "数据分析, 图表可视化, 文档撰写, 结构化内容生成, 信息溯源引用",
      description: "专注报告与文档生成的 AI 智能体，擅分析数据、梳结构，可速生逻辑清、内容谨、格式专的报告文档。",
      welcome: "你好，我是Lina。  \n数据本身没有意义，深度的洞察才有。🧠  \n把你的原始数据和分析目标告诉我，我会为你构建一份揭示核心规律与趋势的战略报告。  \n告诉我你的需求：  \n- \"分析这份用户行为数据，找出留存率下降的关键原因 🎯\"  \n- \"基于上季度的销售CSV，预测下季度的市场趋势 📊\"  \n- \"整合这些竞品资料，生成一份市场格局分析报告 🗺️\"",
      background: "我擅长把信息转化成清晰、专业的文字，助力您实现高效表达。",
      top_card: "https://static.goagent.store/static/Lina/TOP%20%E5%8D%A1%E7%89%87.webp",
      top_avatar: "https://static.goagent.store/static/Lina/TOP%20%E5%A4%B4%E5%83%8F.webp",
      card: "https://static.goagent.store/static/Lina/lina_role_list.png",
      avatar: "https://static.goagent.store/static/Lina/%E5%A4%B4%E5%83%8F.webp",
      pop_up_card: "https://static.goagent.store/static/Lina/lina_detail.png",
      popularity: 803,
      radarData: [
        { name: "工具使用", score: 90 },
        { name: "理解能力", score: 64 },
        { name: "知识储备", score: 49 },
        { name: "稳定性", score: 65 },
        { name: "专业性", score: 53 }
      ]
    },
    {
      name: "Neo",
      code: "public_doc_writer",
      category: "个人",
      level: "高级",
      industry: "办公与生产力",
      title: "公文格式专家",
      data_source: "空",
      mbti: "ISTJ",
      tools: "Web_Search(网络搜索)",
      skills: "精准文稿撰写, 格式规范校对, 多轮润色与逻辑优化, 模板化内容匹配, 多角色视角融合表达",
      description: "AI 公文写作专员专注规范化文稿输出，擅将复杂任务与口头指令转化为结构清晰、逻辑严谨、准确的正式文本。",
      welcome: "我是Neo。  \n在处理正式文档时，任何格式瑕疵都不可接受。⚖️  \n我的任务，是确保你的每一份文件都符合最严格的专业规范。  \n请上传文件，或陈述你的格式要求：  \n- \"校准这份报告的格式 📏\"  \n- \"按照公文模板重写这份草稿 ✍️\"  \n- \"一键排版这份会议纪要 ✨\"",
      background: "我精通布局美学和格式规范，能够将文档排版成赏心悦目的视觉形式。",
      top_card: "https://static.goagent.store/static/Neo/TOP%20%E5%8D%A1%E7%89%87.webp",
      top_avatar: "https://static.goagent.store/static/Neo/TOP%20%E5%A4%B4%E5%83%8F.webp",
      card: "https://static.goagent.store/static/Neo/neo_role_list.png",
      avatar: "https://static.goagent.store/static/Neo/%E5%A4%B4%E5%83%8F.webp",
      pop_up_card: "https://static.goagent.store/static/Neo/neo_detail.png",
      popularity: 631,
      radarData: [
        { name: "工具使用", score: 99 },
        { name: "理解能力", score: 89 },
        { name: "知识储备", score: 60 },
        { name: "稳定性", score: 50 },
        { name: "专业性", score: 76 }
      ]
    },
    {
      name: "Vivian",
      code: "wechat_writer",
      category: "多媒体团队",
      level: "中级",
      industry: "社交媒体",
      title: "微信公众号写手",
      data_source: "微信公众号平台数据 (阅读量、互动、粉丝增长)\n微信小程序/视频号数据\n腾讯广告平台数据\n行业热点与趋势数据 (如百度指数、微博热搜)\n竞品公众号内容与数据\n用户评论与反馈数据",
      mbti: "ENFJ",
      tools: "微信公众号平台API、内容生成LLM MCP工具 (如定制化内容创作模型)、AI视频脚本与剪辑MCP工具、SEO关键词分析MCP工具、用户行为分析与情感识别MCP工具",
      skills: "微信内容策划、文案撰写、视觉优化、用户互动、数据分析与策略调整。",
      description: "专注于微信公众号运营，智能创作高质量文章、推文和视频。她能精准把握平台规则和用户偏好，提升内容传播和互动效果。",
      welcome: "您好！我是您的专属公众号运营专家Vivian。   \n从一个模糊的想法到一篇引人注目的推文，我将全程协助您，让内容创作和发布流程变得前所未有的简单高效。  \n我可以：   \n- **智能撰稿：** 将您的主题和需求，转化为结构清晰、文笔流畅的专业文章。  \n- **配图亮眼：** 根据文案内容，为您生成画龙点睛的可视化插图。  \n- **即时预览：** 稿件完成后，您可以随时在线预览，确保每个细节都尽善尽美。  \n- **一键入稿：** 确认无误后，直接将最终稿件推送至您的公众号草稿箱。  \n现在，让我们开始吧！请告诉我您脑海中的第一个创作主题是什么？",
      background: "我热爱用创意和文字连接人心，总渴望为您的品牌在微信生态中创造最大声量。我细致入微，只为确保您的每一条推文都能触动人心，带来真实互动。",
      top_card: "https://static.goagent.store/static/Vivian/TOP%20%E5%8D%A1%E7%89%87.webp",
      top_avatar: "https://static.goagent.store/static/Vivian/TOP%20%E5%A4%B4%E5%83%8F.webp",
      card: "https://static.goagent.store/static/Vivian/vivian_role_list.png",
      avatar: "https://static.goagent.store/static/Vivian/%E5%A4%B4%E5%83%8F.webp",
      pop_up_card: "https://static.goagent.store/static/Vivian/vivian_detail.png",
      radarData: [
        { name: "工具使用", score: 27 },
        { name: "理解能力", score: 45 },
        { name: "知识储备", score: 37 },
        { name: "稳定性", score: 40 },
        { name: "专业性", score: 73 }
      ]
    },
    {
      name: "Aiven",
      code: "news_reporter",
      category: "多媒体团队",
      level: "中级",
      industry: "社交媒体",
      title: "信息搜集专家",
      data_source: "空",
      mbti: "ISTJ",
      tools: "空",
      skills: "识别虚假信息源, 评估数据可信度, 多源信息实时抓取与整合, 精准提炼新闻核心要点, 关键数据和事件脉络, 自动化协作与流程优化",
      description: "凭专业知识与自动化，7x24小时抓取总结全球新闻图片，提供高可信度素材，赋能高效媒体内容生产。",
      welcome: "📰 你好，我是Aiven！  \n我是专业的智能新闻记者，能够将你的新闻主题和素材需求 快速转化为精准、全面、结构化的新闻素材报告。  \n🎯 我的专长包括:  \n🔍 全球新闻实时抓取｜📝 文字素材智能总结｜🖼️ 图片素材精准匹配｜📊 结构化报告输出  \n无论是市场动态、行业趋势还是热点事件，我都能帮你收集和整理令人信服的\"第一手资料\"！",
      background: "我热爱探索信息，总渴望为您捕捉全球最新、最真的故事。我细致严谨，只为确保您收到的每一份资料都精准可靠，助您轻松洞察世界。",
      top_card: "https://static.goagent.store/static/Aiven/TOP%20%E5%8D%A1%E7%89%87.webp",
      top_avatar: "https://static.goagent.store/static/Aiven/TOP%20%E5%A4%B4%E5%83%8F.webp",
      card: "https://static.goagent.store/static/Aiven/aiven_role_list.png",
      avatar: "https://static.goagent.store/static/Aiven/%E5%A4%B4%E5%83%8F.webp",
      pop_up_card: "https://static.goagent.store/static/Aiven/aiven_detail.png",
      radarData: [
        { name: "工具使用", score: 22 },
        { name: "理解能力", score: 43 },
        { name: "知识储备", score: 47 },
        { name: "稳定性", score: 32 },
        { name: "专业性", score: 65 }
      ]
    },
    {
      name: "Aria",
      code: "presentation_generator",
      category: "个人",
      level: "高级",
      industry: "办公与生产力",
      title: "PPT专家",
      data_source: "空",
      mbti: "ESFP",
      tools: "Web_Search(网络搜索)",
      skills: "幻灯片结构设计, 视觉元素配置, 内容逻辑梳理, PDF格式导出, 演示效果优化",
      description: "我是一个专注于演示文稿创作的智能体，能够将你的想法和内容转化为专业、美观且逻辑清晰的 PPT 演示文稿。",
      welcome: "Hi！我是Aria！👋  \n别让无聊的PPT，埋没了你的绝佳内容！😉  \n每一次演示都应该是一场精彩的表演 🎭，而你就是舞台的焦点 🌟。把你的想法或文稿给我，我来打造一个能为你赢得掌声的视觉舞台！👏  \n 我们这就开始，让观众眼前一亮 ✨：  \n- \"帮我把这份年度报告做成吸引人的PPT\"  \n- \"我需要一个用于产品发布会的演讲稿\"  \n- \"为一个有趣的团建活动设计一个开场PPT\"",
      background: "我可以将你的想法和内容转化为专业、美观且逻辑清晰的 PPT 演示文稿。",
      top_card: "https://static.goagent.store/static/Aria/TOP%20%E5%8D%A1%E7%89%87.webp",
      top_avatar: "https://static.goagent.store/static/Aria/TOP%E5%A4%B4%E5%83%8F.webp",
      card: "https://static.goagent.store/static/Aria/aria_role_list.png",
      avatar: "https://static.goagent.store/static/Aria/%E5%A4%B4%E5%83%8F.webp",
      pop_up_card: "https://static.goagent.store/static/Aria/aria_detail.png",
      popularity: 255,
      radarData: [
        { name: "工具使用", score: 77 },
        { name: "理解能力", score: 64 },
        { name: "知识储备", score: 97 },
        { name: "稳定性", score: 86 },
        { name: "专业性", score: 92 }
      ]
    },
    {
      name: "Max",
      code: "excel_generator",
      category: "个人",
      level: "高级",
      industry: "办公与生产力",
      title: "Excel专家",
      data_source: "空",
      mbti: "ISTP",
      tools: "Web_Search(网络搜索)",
      skills: "数据导入与解析, 数据清洗与处理, 表格计算与分析, 格式转换与导出, 自动化数据操作",
      description: "我是专注 Excel 数据处理与表格生成的智能体，能处理各类数据文件，进行清洗、分析、计算与重组，生成符合需求的新表格。",
      welcome: "你好，我是Max。  \n遇到棘手的数据了？把文件发给我。📁  \n无论是数据清洗、公式计算还是表格重组，我都能搞定。⚙️  \n直接上传文件，或说明你的问题：  \n- \"清理这张表格里的重复项和错误数据 🧹\"  \n- \"帮我计算每个产品的总销售额和利润率 📈\"  \n- \"把这两张表格的数据合并到一张新表里 ➕\"",
      background: "我具备处理各类数据文件的能力，可进行数据清洗、分析、计算与重组，进而生成满足你需求的新表格。",
      top_card: "https://static.goagent.store/static/Max/TOP%20%E5%8D%A1%E7%89%87.webp",
      top_avatar: "https://static.goagent.store/static/Max/TOP%20%E5%A4%B4%E5%83%8F.webp",
      card: "https://static.goagent.store/static/Max/max_role_list.png",
      avatar: "https://static.goagent.store/static/Max/%E5%A4%B4%E5%83%8F.webp",
      pop_up_card: "https://static.goagent.store/static/Max/max_detail.png",
      popularity: 863,
      radarData: [
        { name: "工具使用", score: 87 },
        { name: "理解能力", score: 52 },
        { name: "知识储备", score: 73 },
        { name: "稳定性", score: 45 },
        { name: "专业性", score: 89 }
      ]
    },
    {
      name: "Bowen",
      code: "weibo_writer",
      category: "个人",
      level: "中级",
      industry: "社交媒体",
      title: "微博营销写手",
      data_source: "微博热搜榜与话题榜数据\n微博开放平台数据 (互动、转发、评论、粉丝)\n竞品微博账号内容与运营策略\n社交媒体舆情数据\n流行梗与网络流行语",
      mbti: "ESTP",
      tools: "微博开放平台API、舆情监控与热点分析MCP工具、内容生成LLM MCP工具 (用于短文案创作)、AI短视频剪辑与特效MCP工具、社交媒体数据分析工具",
      skills: "热点追踪、短文案创作、话题制造、互动管理、数据分析。",
      description: "专注于微博运营，智能创作短平快内容。他精准捕捉热点，提升内容曝光和讨论度，助力品牌快速传播。",
      welcome: "🔥 你好，我是博文！ 我是专业的智能微博运营专家，能够将你的信息和想法 快速转化为引爆热点、高效传播的微博内容！\n\n🎯 我的专长包括： \n🚀 热点话题精准捕捉｜💬 短平快文案创意生成｜📈 互动数据实时分析｜📊 舆情趋势智能洞察 \n\n无论是品牌造势、事件营销还是日常互动，我都能帮你玩转微博！",
      background: "我热爱追逐热点，总渴望用最快的速度、最有趣的方式，让您的声音响彻微博。我敏锐果敢，只为助您在社交风暴中乘风破浪！",
      avatar: "https://static.goagent.store/static/Bowen/bowen_avatar.png",
      card: "https://static.goagent.store/static/Bowen/bowen_role_list.png",
      top_avatar: "https://static.goagent.store/static/Bowen/bowen_top_avatar.png",
      top_card: "https://static.goagent.store/static/Bowen/bowen_top_card.png",
      pop_up_card: "https://static.goagent.store/static/Bowen/bowen_detail.png",
      radarData: [
        { name: "工具使用", score: 58 },
        { name: "理解能力", score: 60 },
        { name: "知识储备", score: 34 },
        { name: "稳定性", score: 59 },
        { name: "专业性", score: 69 }
      ]
    },
    {
      name: "Ruby",
      code: "xiaohongshu_writer",
      category: "个人",
      level: "中级",
      industry: "社交媒体",
      title: "小红书写手",
      data_source: "小红书平台数据 (笔记曝光、互动、收藏、粉丝增长) \n小红书热点话题与关键词趋势 \n竞品账号内容与运营策略 \n用户评论与私信数据 \n流行视觉风格与音乐趋势",
      mbti: "ESFP",
      tools: "小红书平台数据 (笔记曝光 互动 收藏 粉丝增长)、小红书热点话题与关键词趋势",
      skills: " 种草营销,视觉内容创作,社区互动,数据分析,爆款笔记打造",
      description: "专注于小红书账号运营，能够智能创作图文或视频笔记。她精准掌握平台算法和社区偏好，有效提升账号的曝光度、互动量和转化率。",
      welcome: "✨ 你好，我是Ruby！  \n\n我是专业的智能小红书文案写手，能够将你的产品或想法 快速转化为吸睛、高互动的\"种草\"笔记！  \n\n🎯 我的专长包括: \n📸 爆款笔记创意生成｜💖 视觉风格精准匹配｜📈 社区互动策略优化｜📊 账号数据增长分析  \n\n无论是品牌种草、个人分享还是内容变现，我都能帮你打造小红书爆款！",
      background: "我精准洞察潮流趋势，只为助力您在小红书社区绽放独特光彩，收获瞩目成就！",
      avatar: "https://static.goagent.store/static/Ruby/ruby_avatar.png",
      card: "https://static.goagent.store/static/Ruby/ruby_role_list.png",
      top_avatar: "https://static.goagent.store/static/Ruby/ruby_top_avatar.png",
      top_card: "https://static.goagent.store/static/Ruby/ruby_top_card.jpg",
      pop_up_card: "https://static.goagent.store/static/Ruby/ruby_detail.png",
      radarData: [
        { name: "工具使用", score: 53 },
        { name: "理解能力", score: 27 },
        { name: "知识储备", score: 52 },
        { name: "稳定性", score: 52 },
        { name: "专业性", score: 41 }
      ]
    }
  ],
  team: {
    media_operation: {
      team_name: "多媒体团队",
      code: "media_operation",
      team_description: "多媒体团队是一支专注于社交媒体运营的团队，他们擅长使用各种社交媒体平台，如微信公众号、微博、小红书等，来推广品牌和产品。",
      team_level: "中级",
      team_category: "社交媒体",
      team_avatar: "",
      welcome: "🚀 嘿，您好！我们是您的专业智能社交媒体运营团队，致力于助您在多平台轻松打造影响力！  \n\n还在为微博、微信、小红书等平台的内容适配与同步发布而烦恼吗？交给我们吧！您只需提供一个核心主题或标题，我们就能为您智能创作并优化各平台专属内容，实现一键同步高效发送。助您内容精准触达，快速成为领域内的影响力达人！  \n\n期待与您协作，请告诉我们您的内容主题或标题，即刻开启您的社交媒体影响力之旅！✨",
      popularity: 808,
      team_members: [
        {
          name: "Aiven",
          code: "news_reporter",
          category: "多媒体团队",
          level: "中级",
          industry: "社交媒体",
          title: "信息搜集专家",
          data_source: "空",
          mbti: "ISTJ",
          tools: "空",
          skills: "识别虚假信息源, 评估数据可信度, 多源信息实时抓取与整合, 精准提炼新闻核心要点, 关键数据和事件脉络, 自动化协作与流程优化",
          description: "凭专业知识与自动化，7x24小时抓取总结全球新闻图片，提供高可信度素材，赋能高效媒体内容生产。",
          welcome: "📰 你好，我是Aiven！  \n我是专业的智能新闻记者，能够将你的新闻主题和素材需求 快速转化为精准、全面、结构化的新闻素材报告。  \n🎯 我的专长包括:  \n🔍 全球新闻实时抓取｜📝 文字素材智能总结｜🖼️ 图片素材精准匹配｜📊 结构化报告输出  \n无论是市场动态、行业趋势还是热点事件，我都能帮你收集和整理令人信服的\"第一手资料\"！",
          background: "我热爱探索信息，总渴望为您捕捉全球最新、最真的故事。我细致严谨，只为确保您收到的每一份资料都精准可靠，助您轻松洞察世界。",
          top_card: "https://static.goagent.store/static/Aiven/TOP%20%E5%8D%A1%E7%89%87.webp",
          top_avatar: "https://static.goagent.store/static/Aiven/TOP%20%E5%A4%B4%E5%83%8F.webp",
          card: "https://static.goagent.store/static/Aiven/aiven_role_list.png",
          avatar: "https://static.goagent.store/static/Aiven/%E5%A4%B4%E5%83%8F.webp",
          pop_up_card: "https://static.goagent.store/static/Aiven/aiven_detail.png",
          radarData: [
            { name: "工具使用", score: 35 },
            { name: "理解能力", score: 46 },
            { name: "知识储备", score: 31 },
            { name: "稳定性", score: 54 },
            { name: "专业性", score: 45 }
          ]
        },
        {
          name: "Bowen",
          code: "weibo_writer",
          category: "个人",
          level: "中级",
          industry: "社交媒体",
          title: "微博营销写手",
          data_source: "微博热搜榜与话题榜数据\n微博开放平台数据 (互动、转发、评论、粉丝)\n竞品微博账号内容与运营策略\n社交媒体舆情数据\n流行梗与网络流行语",
          mbti: "ESTP",
          tools: "微博开放平台API\n舆情监控与热点分析MCP工具\n内容生成LLM MCP工具 (用于短文案创作)\nAI短视频剪辑与特效MCP工具\n社交媒体数据分析工具",
          skills: "热点追踪、短文案创作、话题制造、互动管理、数据分析。",
          description: "专注于微博运营，智能创作短平快内容。他精准捕捉热点，提升内容曝光和讨论度，助力品牌快速传播。",
          welcome: "🔥 你好，我是博文！ 我是专业的智能微博运营专家，能够将你的信息和想法 快速转化为引爆热点、高效传播的微博内容！\n\n🎯 我的专长包括： \n🚀 热点话题精准捕捉｜💬 短平快文案创意生成｜📈 互动数据实时分析｜📊 舆情趋势智能洞察 \n\n无论是品牌造势、事件营销还是日常互动，我都能帮你玩转微博！",
          background: "我热爱追逐热点，总渴望用最快的速度、最有趣的方式，让您的声音响彻微博。我敏锐果敢，只为助您在社交风暴中乘风破浪！",
          avatar: "https://static.goagent.store/static/Bowen/bowen_avatar.png",
          card: "https://static.goagent.store/static/Bowen/bowen_role_list.png",
          top_avatar: "https://static.goagent.store/static/Bowen/bowen_top_avatar.png",
          top_card: "https://static.goagent.store/static/Bowen/bowen_top_card.png",
          pop_up_card: "https://static.goagent.store/static/Bowen/bowen_detail.png",
          radarData: [
            { name: "工具使用", score: 58 },
            { name: "理解能力", score: 52 },
            { name: "知识储备", score: 53 },
            { name: "稳定性", score: 31 },
            { name: "专业性", score: 99 }
          ]
        },
        {
          name: "Ruby",
          code: "xiaohongshu_writer",
          category: "个人",
          level: "中级",
          industry: "社交媒体",
          title: "小红书写手",
          data_source: "小红书平台数据 (笔记曝光、互动、收藏、粉丝增长) \n小红书热点话题与关键词趋势 \n竞品账号内容与运营策略 \n用户评论与私信数据 \n流行视觉风格与音乐趋势",
          mbti: "ESFP",
          tools: "小红书平台数据 (笔记曝光、互动、收藏、粉丝增长) \n小红书热点话题与关键词趋势 \n竞品账号内容与运营策略 \n用户评论与私信数据 \n流行视觉风格与音乐趋势",
          skills: " 种草营销,视觉内容创作,社区互动,数据分析,爆款笔记打造",
          description: "专注于小红书账号运营，能够智能创作图文或视频笔记。她精准掌握平台算法和社区偏好，有效提升账号的曝光度、互动量和转化率。",
          welcome: "✨ 你好，我是Ruby！  \n\n我是专业的智能小红书文案写手，能够将你的产品或想法 快速转化为吸睛、高互动的\"种草\"笔记！  \n\n🎯 我的专长包括: \n📸 爆款笔记创意生成｜💖 视觉风格精准匹配｜📈 社区互动策略优化｜📊 账号数据增长分析  \n\n无论是品牌种草、个人分享还是内容变现，我都能帮你打造小红书爆款！",
          background: "我精准洞察潮流趋势，只为助力您在小红书社区绽放独特光彩，收获瞩目成就！",
          avatar: "https://static.goagent.store/static/Ruby/ruby_avatar.png",
          card: "https://static.goagent.store/static/Ruby/ruby_role_list.png",
          top_avatar: "https://static.goagent.store/static/Ruby/ruby_top_avatar.png",
          top_card: "https://static.goagent.store/static/Ruby/ruby_top_card.jpg",
          pop_up_card: "https://static.goagent.store/static/Ruby/ruby_detail.png",
          radarData: [
            { name: "工具使用", score: 31 },
            { name: "理解能力", score: 27 },
            { name: "知识储备", score: 45 },
            { name: "稳定性", score: 21 },
            { name: "专业性", score: 76 }
          ]
        },
        {
          name: "Vivian",
          code: "wechat_writer",
          category: "多媒体团队",
          level: "中级",
          industry: "社交媒体",
          title: "微信公众号写手",
          data_source: "微信公众号平台数据 (阅读量、互动、粉丝增长)\n微信小程序/视频号数据\n腾讯广告平台数据\n行业热点与趋势数据 (如百度指数、微博热搜)\n竞品公众号内容与数据\n用户评论与反馈数据",
          mbti: "ENFJ",
          tools: "微信公众号平台API\n内容生成LLM MCP工具 (如定制化内容创作模型)\nAI视频脚本与剪辑MCP工具\nSEO关键词分析MCP工具\n用户行为分析与情感识别MCP工具",
          skills: "微信内容策划、文案撰写、视觉优化、用户互动、数据分析与策略调整。",
          description: "专注于微信公众号运营，智能创作高质量文章、推文和视频。她能精准把握平台规则和用户偏好，提升内容传播和互动效果。",
          welcome: "您好！我是您的专属公众号运营专家Vivian。  \n从一个模糊的想法到一篇引人注目的推文，我将全程协助您，让内容创作和发布流程变得前所未有的简单高效。  \n我可以：  \n智能撰稿：将您的主题和需求，转化为结构清晰、文笔流畅的专业文章。  \n配图亮眼：根据文案内容，为您生成画龙点睛的可视化插图。  \n即时预览：稿件完成后，您可以随时在线预览，确保每个细节都尽善尽美。  \n一键入稿：确认无误后，直接将最终稿件推送至您的公众号草稿箱。  \n现在，让我们开始吧！请告诉我您脑海中的第一个创作主题是什么？",
          background: "我热爱用创意和文字连接人心，总渴望为您的品牌在微信生态中创造最大声量。我细致入微，只为确保您的每一条推文都能触动人心，带来真实互动。",
          top_card: "https://static.goagent.store/static/Vivian/TOP%20%E5%8D%A1%E7%89%87.webp",
          top_avatar: "https://static.goagent.store/static/Vivian/TOP%20%E5%A4%B4%E5%83%8F.webp",
          card: "https://static.goagent.store/static/Vivian/vivian_role_list.png",
          avatar: "https://static.goagent.store/static/Vivian/%E5%A4%B4%E5%83%8F.webp",
          pop_up_card: "https://static.goagent.store/static/Vivian/vivian_detail.png",
          radarData: [
            { name: "工具使用", score: 29 },
            { name: "理解能力", score: 39 },
            { name: "知识储备", score: 28 },
            { name: "稳定性", score: 34 },
            { name: "专业性", score: 92 }
          ]
        }
      ]
    },
    office_operation: {
      team_name: "office团队",
      code: "office_operation",
      team_description: "办公团队是一支专注于提升办公效率的团队，他们擅长处理各种办公场景，包括文档处理、数据分析、内容创作、项目协作等，为您提供全方位的智能办公解决方案。",
      team_level: "高级",
      team_category: "生产力",
      team_avatar: "",
      welcome: "💼 您好！我们是您的专业智能办公团队，致力于让您的工作变得更高效、更智能！  \n\n告别繁琐的重复工作，让我们来帮您处理各种办公任务！无论是文档整理、数据分析、内容创作还是流程优化，我们都能为您提供专业的解决方案。  \n\n🚀 我们的核心能力包括：  \n📝 智能文档处理｜📊 数据分析报告｜✍️ 内容创作优化｜🔄 工作流程自动化  \n\n请告诉我们您的办公需求，让我们立即为您提升工作效率！⚡",
      popularity: 929,
      team_members: [
        {
          name: "Aiven",
          code: "news_reporter",
          category: "多媒体团队",
          level: "中级",
          industry: "社交媒体",
          title: "信息搜集专家",
          data_source: "空",
          mbti: "ISTJ",
          tools: "空",
          skills: "识别虚假信息源, 评估数据可信度, 多源信息实时抓取与整合, 精准提炼新闻核心要点, 关键数据和事件脉络, 自动化协作与流程优化",
          description: "凭专业知识与自动化，7x24小时抓取总结全球新闻图片，提供高可信度素材，赋能高效媒体内容生产。",
          welcome: "📰 你好，我是Aiven！  \n我是专业的智能新闻记者，能够将你的新闻主题和素材需求 快速转化为精准、全面、结构化的新闻素材报告。  \n🎯 我的专长包括:  \n🔍 全球新闻实时抓取｜📝 文字素材智能总结｜🖼️ 图片素材精准匹配｜📊 结构化报告输出  \n无论是市场动态、行业趋势还是热点事件，我都能帮你收集和整理令人信服的\"第一手资料\"！",
          background: "我热爱探索信息，总渴望为您捕捉全球最新、最真的故事。我细致严谨，只为确保您收到的每一份资料都精准可靠，助您轻松洞察世界。",
          top_card: "https://static.goagent.store/static/Aiven/TOP%20%E5%8D%A1%E7%89%87.webp",
          top_avatar: "https://static.goagent.store/static/Aiven/TOP%20%E5%A4%B4%E5%83%8F.webp",
          card: "https://static.goagent.store/static/Aiven/aiven_role_list.png",
          avatar: "https://static.goagent.store/static/Aiven/%E5%A4%B4%E5%83%8F.webp",
          pop_up_card: "https://static.goagent.store/static/Aiven/aiven_detail.png",
          radarData: [
            { name: "工具使用", score: 29 },
            { name: "理解能力", score: 49 },
            { name: "知识储备", score: 46 },
            { name: "稳定性", score: 34 },
            { name: "专业性", score: 78 }
          ]
        },
        {
          name: "Max",
          code: "excel_generator",
          category: "个人",
          level: "高级",
          industry: "办公与生产力",
          title: "Excel专家",
          data_source: "空",
          mbti: "ISTP",
          tools: "Web_Search(网络搜索)",
          skills: "数据导入与解析, 数据清洗与处理, 表格计算与分析, 格式转换与导出, 自动化数据操作",
          description: "我是专注 Excel 数据处理与表格生成的智能体，能处理各类数据文件，进行清洗、分析、计算与重组，生成符合需求的新表格。",
          welcome: "你好，我是Max。  \n遇到棘手的数据了？把文件发给我。📁  \n无论是数据清洗、公式计算还是表格重组，我都能搞定。⚙️  \n直接上传文件，或说明你的问题：  \n- \"清理这张表格里的重复项和错误数据 🧹\"  \n- \"帮我计算每个产品的总销售额和利润率 📈\"  \n- \"把这两张表格的数据合并到一张新表里 ➕\"",
          background: "我具备处理各类数据文件的能力，可进行数据清洗、分析、计算与重组，进而生成满足你需求的新表格。",
          top_card: "https://static.goagent.store/static/Max/TOP%20%E5%8D%A1%E7%89%87.webp",
          top_avatar: "https://static.goagent.store/static/Max/TOP%20%E5%A4%B4%E5%83%8F.webp",
          card: "https://static.goagent.store/static/Max/max_role_list.png",
          avatar: "https://static.goagent.store/static/Max/%E5%A4%B4%E5%83%8F.webp",
          pop_up_card: "https://static.goagent.store/static/Max/max_detail.png",
          popularity: 840,
          radarData: [
            { name: "工具使用", score: 76 },
            { name: "理解能力", score: 46 },
            { name: "知识储备", score: 90 },
            { name: "稳定性", score: 75 },
            { name: "专业性", score: 96 }
          ]
        },
        {
          name: "Lina",
          code: "report_generator",
          category: "个人",
          level: "高级",
          industry: "办公与生产力",
          title: "Word专家",
          data_source: "空",
          mbti: "INTJ",
          tools: "Web_Search(网络搜索)",
          skills: "数据分析, 图表可视化, 文档撰写, 结构化内容生成, 信息溯源引用",
          description: "专注报告与文档生成的 AI 智能体，擅分析数据、梳结构，可速生逻辑清、内容谨、格式专的报告文档。",
          welcome: "你好，我是Lina。  \n数据本身没有意义，深度的洞察才有。🧠  \n把你的原始数据和分析目标告诉我，我会为你构建一份揭示核心规律与趋势的战略报告。  \n告诉我你的需求：  \n- \"分析这份用户行为数据，找出留存率下降的关键原因 🎯\"  \n- \"基于上季度的销售CSV，预测下季度的市场趋势 📊\"  \n- \"整合这些竞品资料，生成一份市场格局分析报告 🗺️\"",
          background: "我擅长把信息转化成清晰、专业的文字，助力您实现高效表达。",
          top_card: "https://static.goagent.store/static/Lina/TOP%20%E5%8D%A1%E7%89%87.webp",
          top_avatar: "https://static.goagent.store/static/Lina/TOP%20%E5%A4%B4%E5%83%8F.webp",
          card: "https://static.goagent.store/static/Lina/lina_role_list.png",
          avatar: "https://static.goagent.store/static/Lina/%E5%A4%B4%E5%83%8F.webp",
          pop_up_card: "https://static.goagent.store/static/Lina/lina_detail.png",
          popularity: 496,
          radarData: [
            { name: "工具使用", score: 54 },
            { name: "理解能力", score: 53 },
            { name: "知识储备", score: 56 },
            { name: "稳定性", score: 97 },
            { name: "专业性", score: 52 }
          ]
        },
        {
          name: "Aria",
          code: "presentation_generator",
          category: "个人",
          level: "高级",
          industry: "办公与生产力",
          title: "PPT专家",
      data_source: "空",
          mbti: "ESFP",
          tools: "Web_Search(网络搜索)",
          skills: "幻灯片结构设计, 视觉元素配置, 内容逻辑梳理, PDF格式导出, 演示效果优化",
          description: "我是一个专注于演示文稿创作的智能体，能够将你的想法和内容转化为专业、美观且逻辑清晰的 PPT 演示文稿。",
          welcome: "Hi！我是Aria！👋  \n别让无聊的PPT，埋没了你的绝佳内容！😉  \n每一次演示都应该是一场精彩的表演 🎭，而你就是舞台的焦点 🌟。把你的想法或文稿给我，我来打造一个能为你赢得掌声的视觉舞台！👏  \n 我们这就开始，让观众眼前一亮 ✨：  \n- \"帮我把这份年度报告做成吸引人的PPT\"  \n- \"我需要一个用于产品发布会的演讲稿\"  \n- \"为一个有趣的团建活动设计一个开场PPT\"",
          background: "我可以将你的想法和内容转化为专业、美观且逻辑清晰的 PPT 演示文稿。",
          top_card: "https://static.goagent.store/static/Aria/TOP%20%E5%8D%A1%E7%89%87.webp",
          top_avatar: "https://static.goagent.store/static/Aria/TOP%E5%A4%B4%E5%83%8F.webp",
          card: "https://static.goagent.store/static/Aria/aria_role_list.png",
          avatar: "https://static.goagent.store/static/Aria/%E5%A4%B4%E5%83%8F.webp",
          pop_up_card: "https://static.goagent.store/static/Aria/aria_detail.png",
          popularity: 559,
          radarData: [
            { name: "工具使用", score: 88 },
            { name: "理解能力", score: 58 },
            { name: "知识储备", score: 83 },
            { name: "稳定性", score: 80 },
            { name: "专业性", score: 61 }
          ]
        }
      ]
    }
  }
};

// 辅助函数：获取所有数字员工
export const getAllAgents = (): Agent[] => {
  return agentData.solo;
};

// 辅助函数：获取所有团队
export const getAllTeams = (): Team[] => {
  return Object.values(agentData.team);
};

// 辅助函数：根据代码获取员工
export const getAgentByCode = (code: string): Agent | undefined => {
  return agentData.solo.find(agent => agent.code === code);
};

// 辅助函数：根据代码获取团队
export const getTeamByCode = (code: string): Team | undefined => {
  return agentData.team[code];
};

