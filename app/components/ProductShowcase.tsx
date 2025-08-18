"use client";

import { useMemo, useState, useRef, useEffect } from 'react';
import { ReusableProductCard, Product as ReusableProduct } from './ReusableProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Legacy/lightweight product shape supported for convenience.
 * We'll normalize it to the richer ReusableProduct interface expected by ReusableProductCard.
 */
interface LegacyProductItem {
	id?: string;          // optional; if missing we'll derive from slug or title
	slug: string;
	title: string;
	description: string;
	image?: string;
	price: string;        // can be a formatted string e.g. "₹999"; card already handles string price
	originalPrice?: string;
	category?: string;
	rating?: number;
	reviewCount?: number;
	isNew?: boolean;
	isFeatured?: boolean;
	inStock?: boolean;
}

interface ProductShowcaseProps {
	products: (LegacyProductItem | ReusableProduct)[];
	title: string;
	subtitle?: string;
	pageSize?: number;               // items per pagination page (default 6)
	autoScrollOnPageChange?: boolean; // scroll into view on page change (default false)
	viewMode?: 'grid' | 'list';      // list mode will stack cards vertically (still paginated)
}

export default function ProductShowcase({
	products,
	title,
	subtitle,
	pageSize = 6,
	autoScrollOnPageChange = false,
	viewMode = 'grid',
}: ProductShowcaseProps) {
	const [page, setPage] = useState(1);
	const containerRef = useRef<HTMLDivElement | null>(null);

	// Normalize products
	const normalized: ReusableProduct[] = useMemo(() => {
		if (!products || products.length === 0) return [];
		return products.map(p => {
			const candidate = p as ReusableProduct;
			// Heuristic: if it already has id, price (string) and title assume full shape
			if (candidate.id && candidate.title && candidate.price) {
				return candidate;
			}
			const legacy = p as LegacyProductItem;
			const id = legacy.id || legacy.slug || legacy.title.replace(/\s+/g, '-').toLowerCase();
			return {
				id,
				slug: legacy.slug,
				title: legacy.title,
				description: legacy.description,
				price: legacy.price,
				originalPrice: legacy.originalPrice,
				image: legacy.image,
				category: legacy.category,
				rating: legacy.rating,
				reviewCount: legacy.reviewCount,
				isNew: legacy.isNew,
				isFeatured: legacy.isFeatured,
				inStock: legacy.inStock !== false, // default true
			} as ReusableProduct;
		});
	}, [products]);

	const totalPages = Math.max(1, Math.ceil(normalized.length / pageSize));
	const currentPage = Math.min(page, totalPages);
	const startIdx = (currentPage - 1) * pageSize;
	const pageItems = normalized.slice(startIdx, startIdx + pageSize);

	const handlePageChange = (p: number) => {
		if (p < 1 || p > totalPages) return;
		setPage(p);
	};

	// Optional scroll into view
	useEffect(() => {
		if (autoScrollOnPageChange) {
			containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [currentPage, autoScrollOnPageChange]);

	// Guard: nothing to show - moved after hooks to comply with rules of hooks
	if (!products || products.length === 0) return null;

	return (
		<div className="mb-12" ref={containerRef}>
			{/* Heading + pagination */}
			<div className="mb-4 flex flex-col gap-3">
				<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
					<div className="max-w-3xl">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
							{title}
						</h2>
						{subtitle && (
							<p className="text-lg md:text-xl text-gray-600" style={{ fontFamily: 'Playfair Display, serif' }}>
								{subtitle}
							</p>
						)}
						<div className="mt-2 text-sm text-gray-500 font-medium">Page {currentPage} of {totalPages}</div>
					</div>
					{totalPages > 1 && (
						<div className="flex justify-end">
							<div className="flex items-center gap-2">
								<button
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1}
									aria-label="Previous page"
									className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black shadow-sm"
								>
									<ArrowLeft className="w-4 h-4" />
								</button>
								<button
									onClick={() => handlePageChange(currentPage + 1)}
									disabled={currentPage === totalPages}
									aria-label="Next page"
									className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black shadow-sm"
								>
									<ArrowRight className="w-4 h-4" />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Items */}
			<AnimatePresence mode="popLayout">
				<motion.div
					key={`page-${currentPage}-${viewMode}`}
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -15 }}
					transition={{ duration: 0.3 }}
					className={viewMode === 'grid' ? 'flex gap-6 overflow-hidden' : 'flex flex-col gap-6'}
				>
					{pageItems.map(product => (
						<div key={product.id} className={viewMode === 'grid' ? 'w-72 flex-shrink-0' : ''}>
							<ReusableProductCard product={product} viewMode={viewMode} />
						</div>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
