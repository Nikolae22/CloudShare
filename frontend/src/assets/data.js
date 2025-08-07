import {CreditCard, Files, LayoutDashboard, Receipt, Upload} from "lucide-react";

export const features=[
    {
        iconName: 'FileText',
        iconColor: 'text-purple-500',
        title: 'Easy File Upload',
        description: 'Quickly upload your files with our intuitive drag-and-drop interface.'
    },
    {
        iconName: 'Shield',
        iconColor: 'text-green-500',
        title: 'Secure Storage',
        description: 'Your file are encrypted and stored securely in our cloud infrastructure.'
    },
    {
        iconName: 'Share2',
        iconColor: 'text-purple-500',
        title: 'Simple Sharing',
        description: 'Share files anyone using secure links that you control.'
    },
    {
        iconName: 'CreditCart',
        iconColor: 'text-orange-500',
        title: 'Flexible credits',
        description: 'Pay only for what you use with our-credit-based system.'
    },
    {
        iconName: 'FileText',
        iconColor: 'text-red-500',
        title: 'File Management',
        description: 'Organize preview and manage your files from any advice.'
    },
    {
        iconName: 'Clock',
        iconColor: 'text-blue-500',
        title: 'Transaction History',
        description: 'Keep track of all your credit purchase and usage.'
    }
]

export const pricingPlans=[
    {
        name:'Free',
        price:'0$',
        description: 'Perfect for getting started',
        features:[
            '5 File Uploads',
            'Basic File Sharing',
            '7-day File retention',
            'Email support',
        ],
        cta: 'Get Started',
        highlighted: false
    },
    {
        name:'Premium',
        price:'500$',
        description: 'For individuals with larger needs',
        features:[
            '500 File Uploads',
            'Advanced File Sharing',
            '30-day File Retention',
            'Priority Email Support',
            'File analytics'
        ],
        cta: 'Go Premium',
        highlighted: true
    },
    {
        name:'Ultimate',
        price:'1000$',
        description: 'For teams and business',
        features:[
            '5000 File Uploads',
            'Team Sharing capabilities',
            'Unlimited File Retention',
            '24/7 Priority Support',
            'Advanced analytics',
            'API Access'
        ],
        cta: 'Go Ultimate',
        highlighted: false
    },
]

export const testimonials=[
    {
        name: 'Nina Pola',
        role: 'Project Manager',
        company:'Micky mouse',
        image: 'https://randomuser.me/api/portraits/women/65.jpg',
        quote: 'Easy managing project files across multiple teams used.',
        rating: 4
    },
    {
        name: 'Ui Dx',
        role: 'Freelance Designer',
        company:'Self made',
        image: 'https://randomuser.me/api/portraits/men/46.jpg',
        quote: 'As a freelancer I need to share large design files with clients securely. CloudShare simplify my life',
        rating: 4
    },
]

export const SIDE_MENU_DATA=[
    {
        id: '01',
        label: "Dashboard",
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        id: '02',
        label: "Upload",
        icon: Upload,
        path: '/upload'
    },
    {
        id: '03',
        label: "My Files",
        icon: Files,
        path: '/my-files'
    },
    {
        id: '04',
        label: "Subscription",
        icon: CreditCard,
        path: '/subscription'
    },

    {
        id: '05',
        label: "Transactions",
        icon: Receipt,
        path: '/transactions'
    },
]