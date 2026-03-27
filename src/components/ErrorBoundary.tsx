import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { Magnetic } from "./ui/Magnetic"; // Adjust path if necessary

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error(`[Error in ${this.props.sectionName || 'Component'}]:`, error, errorInfo);
  }

  // Premium Feature: Allow users to attempt a recovery without a hard page refresh
  private resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="p-8 m-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-red-500/20 rounded-3xl flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden"
        >
          {/* Subtle Danger Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/10 blur-[60px] rounded-full pointer-events-none z-0" />
          
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 relative z-10 shadow-inner">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          
          <h2 className="text-xl font-black text-navy-900 dark:text-white tracking-tight mb-2 relative z-10">
            Module Loading Error
          </h2>
          
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-md mb-8 relative z-10 leading-relaxed">
            The <span className="text-gold-500 font-bold uppercase tracking-widest px-1">{this.props.sectionName || "component"}</span> failed to initialize properly. This might be a temporary network or rendering issue.
          </p>

          <Magnetic intensity={0.2}>
            <button 
              onClick={this.resetErrorBoundary}
              className="group flex items-center px-6 py-3 bg-navy-900 dark:bg-white text-white dark:text-navy-900 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:shadow-navy-900/20 dark:hover:shadow-white/20 relative z-10 hover:-translate-y-0.5"
            >
              <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-700 ease-out" />
              Reload Module
            </button>
          </Magnetic>
        </motion.div>
      );
    }

    return this.props.children;
  }
}